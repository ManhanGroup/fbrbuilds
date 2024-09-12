class RemoveColumnsFromDevelopments < ActiveRecord::Migration[7.0]
  def change
    remove_column :developments, :ab1317
    remove_column :developments, :rhna
    remove_column :developments, :school
    remove_column :developments, :empsvc
    remove_column :developments, :empoth
    remove_column :developments, :empofc
    remove_column :developments, :empmed
    remove_column :developments, :empind
    remove_column :developments, :empgov
    remove_column :developments, :empfoo
    remove_column :developments, :empedu
    remove_column :developments, :studk12p
    remove_column :developments, :studunip

  end
end
