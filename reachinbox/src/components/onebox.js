import React, { useState, useEffect } from 'react';
import '../styles/OneBox.css';
import 'bootstrap-icons/font/bootstrap-icons.css'; 

const OneBox = () => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReplying, setIsReplying] = useState(false);
  const [replyBody, setReplyBody] = useState('');

  useEffect(() => {
    const baseURL = 'https://run.mocky.io/v3/6194d6e4-3284-4fba-a242-ec1cf9722655';
    const endpoint = '/onebox/list'; 

    fetch(`${baseURL}${endpoint}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer {{token}}', 
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setEmails(data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  const handleEmailClick = (email) => {
    setSelectedEmail(email);
    setIsReplying(false);
  };

  const handleReplyClick = () => {
    setIsReplying(true);
    setReplyBody('');
  };

  const handleReplyChange = (e) => {
    setReplyBody(e.target.value);
  };
  const handleDeleteClick = () => {
    if (selectedEmail) {
      setEmails(emails.filter(email => email.id !== selectedEmail.id));
      setSelectedEmail(null);
    }
  };
  const handleSendReply = () => {
    console.log('Reply sent:', replyBody);
    setIsReplying(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="onebox-container">
      <div className="email-list">
        <h1>All Inbox(s)</h1>
        <ul>
          {emails.map((email) => (
            <li
              key={email.id}
              className="email-item"
              onClick={() => handleEmailClick(email)}
            >
              <div className="email-info">
                <span className="email-from">{email.fromEmail}</span>
                <span className="email-subject">{email.subject}</span>
                <div className='vl'></div>
              </div>
              <div className="email-details">
                <span className={`email-status ${email.status ? email.status.toLowerCase() : ''}`}>
                  {email.status}
                </span>
                <span className="email-campaign">{email.campaignName}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {selectedEmail && (
        <div className="email-detail">
          <div className='headercard'>
            <select>
              <option><strong>Meeting completed</strong></option>
            </select>
            <select>
              <option><strong>Move</strong></option>
              <option>Positive</option>
              <option>Negative</option>
              <option>Natural</option>
            </select>
            <select>
              <option><strong><i className="bi bi-three-dots"></i></strong></option>
              <option><i className="bi bi-bookmark-x-fill"></i> Mark as Unread</option>
              <option><i className="bi bi-pencil-square"></i> Edit Lead</option>
              <option><i className="bi bi-person-dash-fill"></i> Remove lead</option>
              <option><i className="bi bi-clock"></i> Set reminder</option>
              <option onClick={handleDeleteClick}><i className="bi bi-trash"></i> Delete</option>
            </select>
          </div>
          <h2>{selectedEmail.subject}</h2>
          <p><strong>From:</strong> {selectedEmail.fromEmail}</p>
          <p><strong>To:</strong> {selectedEmail.toEmail}</p>
          <p>{selectedEmail.body}</p>
          <button className="reply-button" onClick={handleReplyClick}>Reply</button>
          
          {isReplying && (
            <div className="reply-email">
              <div className="reply-header">
                <label>To:</label>
                <input type="text" value={selectedEmail.toEmail} readOnly />
              </div>
              <div className="reply-header">
                <label>From:</label>
                <input type="text" value={selectedEmail.fromEmail} readOnly />
              </div>
              <div className="reply-header">
                <label>Subject:</label>
                <input type="text" value={`Re: ${selectedEmail.subject}`} readOnly />
              </div>
              <textarea
                className="reply-body"
                value={replyBody}
                onChange={handleReplyChange}
                rows="10"
                placeholder="Type your reply here..."
              ></textarea>
              <div className="reply-actions">
                <button onClick={handleSendReply} className="send-reply-button">Send</button>
                <button onClick={() => setIsReplying(false)} className="cancel-reply-button">Cancel</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default OneBox;
