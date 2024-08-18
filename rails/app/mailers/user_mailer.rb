class UserMailer < ApplicationMailer
  default from: 'mailgun@mg.ywconsultinggroup.com'
  def password_reset_email(user, password)
    @user = user
    @password = password
    @login_url = url_for("#{root_url}login")
    mail(to: @user.email, subject: 'Your fbrbuilds Password')
  end

  def new_user_email(user)
    @user = user
    mail(to: @user.email, subject: 'Welcome to fbrbuilds')
  end

  def edit_approved_email(edit)
    @edit = edit
    mail(to: @edit.user.email, subject: 'Your Edit in fbrbuilds Was Approved')
  end
end
