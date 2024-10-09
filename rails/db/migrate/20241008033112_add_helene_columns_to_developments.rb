class AddHeleneColumnsToDevelopments < ActiveRecord::Migration[7.0]
  def change
    add_column :developments, :is_damage, :boolean
    add_column :developments, :damage_type, :string
  end
end
