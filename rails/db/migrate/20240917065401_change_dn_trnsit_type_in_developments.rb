class ChangeDnTrnsitTypeInDevelopments < ActiveRecord::Migration[7.0]
  def up
    change_column :developments, :d_n_trnsit, 'numeric USING CAST(d_n_trnsit AS numeric)'
  end
  
  def down
    change_column :developments, :d_n_trnsit, :string
  end
end


