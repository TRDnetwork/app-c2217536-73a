```javascript
export const resetPasswordEmailTemplate = (appName, userName, resetLink) => {
  return `
    <div style="background-color: #f7f7f7; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333; font-weight: bold; margin-top: 0;">Reset Your Password</h2>
      <p style="color: #666; font-size: 16px;">Hi ${userName},</p>
      <p style="color: #666; font-size: 16px;">You requested a password reset for your ${appName} account. Click the link below to reset your password:</p>
      <p style="color: #666; font-size: 16px;"><a href="${resetLink}" style="color: #03a9f4; text-decoration: none;">Reset Password</a></p>
      <p style="color: #666; font-size: 16px;">Best regards,</p>
      <p style="color: #666; font-size: 16px;">The ${appName} Team</p>
    </div>
  `;
};
```

### Wire Sending into Existing Routes

We will wire the sending of emails into the existing routes for signing up and resetting passwords.