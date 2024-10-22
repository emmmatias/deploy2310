"""Add encryption_algorithm to Message model

Revision ID: 82bd4894978a
Revises: b44650363c7e
Create Date: 2024-10-22 00:00:00.000000

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '82bd4894978a'
down_revision = 'b44650363c7e'
branch_labels = None
depends_on = None


def upgrade():
    # Add the column as nullable
    op.add_column('message', sa.Column('encryption_algorithm', sa.String(10), nullable=True))
    
    # Update existing rows with the default value
    op.execute("UPDATE message SET encryption_algorithm = 'SHA256' WHERE encryption_algorithm IS NULL")
    
    # Alter the column to be non-nullable
    op.alter_column('message', 'encryption_algorithm', nullable=False)


def downgrade():
    op.drop_column('message', 'encryption_algorithm')
