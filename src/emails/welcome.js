```javascript
export const welcomeEmailTemplate = (appName, userName) => {
  return `
    <div style="background-color: #f7f7f7; padding: 20px; border: 1px solid #ddd; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
      <h2 style="color: #333; font-weight: bold; margin-top: 0;">Welcome to ${appName}</h2>
      <p style="color: #666; font-size: 16px;">Hi ${userName},</p>
      <p style="color: #666; font-size: 16px;">Thanks for joining ${appName}! We're excited to have you on board.</p>
      <p style="color: #666; font-size: 16px;">Best regards,</p>
      <p style="color: #666; font-size: 16px;">The ${appName} Team</p>
    </div>
  `;
};
```