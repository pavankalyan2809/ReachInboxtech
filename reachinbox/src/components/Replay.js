// ReplyEmail.js
import React, { useState } from 'react';
import '../styles/Replay.css';

const ReplyEmail = () => {
  const [emailData, setEmailData] = useState({
    to: 'jeanne@icloud.com',
    from: 'peter@reachinbox.com',
    subject: 'Warmup Welcome',
    body: 'Hi Jeanne,'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEmailData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   
    console.log(emailData);
  };

  return (
    <div className="reply-email">
      <div className="reply-email-header">
        <span>Reply</span>
        <button className="close-button">&times;</button>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="email-input-group">
          <label>To:</label>
          <input
            type="email"
            name="to"
            value={emailData.to}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="email-input-group">
          <label>From:</label>
          <input
            type="email"
            name="from"
            value={emailData.from}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className="email-input-group">
          <label>Subject:</label>
          <input
            type="text"
            name="subject"
            value={emailData.subject}
            onChange={handleInputChange}
          />
        </div>
        <textarea
          className="email-body"
          name="body"
          value={emailData.body}
          onChange={handleInputChange}
          rows="8"
        ></textarea>
        <div className="email-footer">
          <button type="submit" className="send-button">Send</button>
          <button type="button" className="cancel-button">Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default ReplyEmail;
