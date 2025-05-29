export default function Privacy() {
  return (
    <div style={containerStyle}>
      <h1 style={h1Style}>Privacy Policy for Stack Productivity</h1>
      <p style={effectiveDateStyle}>Effective Date: 8th May 2025</p>
      <div style={sectionStyle}>
        <p>This Privacy Policy explains how Stack Productivity ("we," "our," or "us") collects, uses, and protects your information when you use our mobile application, Stack Productivity ("the App"). By using the App, you agree to the terms of this Privacy Policy.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>1. Information We Collect</h2>
        <p>We collect the following information from users:</p>
        <ul>
          <li>Name</li>
          <li>Email address</li>
          <li>User-generated content, such as tasks, notes, and calendar entries</li>
        </ul>
        <p>This information is collected when users sign up for an account and interact with the App.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>2. How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your user account</li>
          <li>Enable app functionality and personalized features</li>
          <li>Respond to user inquiries and provide customer support</li>
          <li>Improve the performance and user experience of the App</li>
        </ul>
        <p>We do not use your data for advertising or marketing purposes.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>3. How Your Information is Stored</h2>
        <p>All user data is securely stored using Firebase, a service provided by Google. Firebase may store data on servers located in the United States or other jurisdictions maintained by Google. Firebase complies with major data protection frameworks including GDPR and CCPA.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>4. User Authentication</h2>
        <p>Users must create an account using their email address and password. We use Firebase Authentication to manage login credentials securely. Passwords are never stored in plain text.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>5. Data Access, Modification, and Deletion</h2>
        <p>You may delete your account and all associated data at any time directly through the app's account settings. If you require additional assistance, you may also contact us at <a href="mailto:ishizzywang@gmail.com">ishizzywang@gmail.com</a>.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>6. Sharing of Information</h2>
        <p>We do not share your personal information with any third parties for advertising, analytics, or other marketing purposes. Your data is used solely to operate and improve the App.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>7. International Data Transfers</h2>
        <p>As our data infrastructure is provided by Firebase (Google), your data may be transferred to and processed in countries outside of your own. We ensure all such transfers comply with relevant data protection laws.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>8. Children's Privacy</h2>
        <p>The App is not intended for use by individuals under the age of 13. We do not knowingly collect data from children under 13. If we become aware of such data being collected, it will be deleted immediately.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>9. Changes to This Privacy Policy</h2>
        <p>We may update this Privacy Policy from time to time. When we do, we will revise the "Effective Date" at the top of the policy. You are advised to review this policy periodically for any changes.</p>
      </div>
      <div style={sectionStyle}>
        <h2 style={h2Style}>10. Contact Us</h2>
        <div style={contactInfoStyle}>
          <p>If you have any questions or concerns about this Privacy Policy or your personal data, please contact us at:</p>
          <p>Ian Ranasinghe<br />
          Email: <a href="mailto:ishizzywang@gmail.com">ishizzywang@gmail.com</a></p>
        </div>
      </div>
      <div style={sectionStyle}>
        <p>Thank you for trusting Stack Productivity.</p>
      </div>
    </div>
  );
}

const containerStyle = {
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif',
  lineHeight: 1.6,
  color: '#333',
  maxWidth: 800,
  margin: '0 auto',
  padding: 20,
};
const h1Style = {
  color: '#2c3e50',
  borderBottom: '2px solid #eee',
  paddingBottom: 10,
};
const h2Style = {
  color: '#34495e',
  marginTop: 30,
};
const effectiveDateStyle = {
  color: '#666',
  fontStyle: 'italic',
  marginBottom: 30,
};
const sectionStyle = {
  marginBottom: 25,
};
const contactInfoStyle = {
  backgroundColor: '#f8f9fa',
  padding: 20,
  borderRadius: 5,
  marginTop: 30,
}; 