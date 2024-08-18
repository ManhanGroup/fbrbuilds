require "rails_helper"

RSpec.describe "UserMailer", type: :mailer do
  describe "email password" do
    let(:user) { FactoryBot.create(:user) }
    let(:mail) { UserMailer.password_reset_email(user, user.password) }

    it "renders the headers" do
      expect(mail.subject).to eq("Your fbrbuilds Password")
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(["mailgun@mg.ywconsultinggroup.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to include(user.password)
    end
  end

  describe "send welcome email" do
    let(:user) { FactoryBot.create(:user) }
    let(:mail) { UserMailer.new_user_email(user) }

    it "renders the headers" do
      expect(mail.subject).to eq("Welcome to fbrbuilds")
      expect(mail.to).to eq([user.email])
      expect(mail.from).to eq(["mailgun@mg.ywconsultinggroup.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to include('Thank you for signing up for fbrbuilds!')
    end
  end

  describe "send edit approved email" do
    let(:edit) { FactoryBot.create(:edit) }
    let(:mail) { UserMailer.edit_approved_email(edit) }

    it "renders the headers" do
      expect(mail.subject).to eq("Your Edit in fbrbuilds Was Approved")
      expect(mail.to).to eq([edit.user.email])
      expect(mail.from).to eq(["mailgun@mg.ywconsultinggroup.com"])
    end

    it "renders the body" do
      expect(mail.body.encoded).to include('was approved by a fbrbuilds moderator')
    end
  end
end
