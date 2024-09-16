class MoreChangesOnDevelopments < ActiveRecord::Migration[7.0]
  def change
    remove_column :developments, :placetype
    remove_column :developments, :stat_comts
    remove_column :developments, :mix_descr
    remove_column :developments, :gluc
    remove_column :developments, :sb_type
    remove_column :developments, :empret
    add_column :developments, :d_n_trnsit, :string
    add_column :developments, :height, :integer
    add_column :developments, :stories, :integer
    rename_column :developments, :aff_u50, :aff_u30
    rename_column :developments, :aff_80_120, :aff_30_50
    rename_column :developments, :aff_120p, :aff_80p
  end
end
