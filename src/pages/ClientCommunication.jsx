import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, MessageCircle, Send } from 'lucide-react';
import { apiService } from '../services/api';

const ClientCommunication = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [newMessage, setNewMessage] = useState('');
  const [loadingContacts, setLoadingContacts] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sendingMessage, setSendingMessage] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContacts = async () => {
      setLoadingContacts(true);
      setError(null);
      try {
        const data = await apiService.getContacts();
        setContacts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingContacts(false);
      }
    };

    fetchContacts();
  }, []);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact) {
        setMessages([]);
        return;
      }
      setLoadingMessages(true);
      setError(null);
      try {
        const data = await apiService.getMessages(selectedContact.id);
        setMessages(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedContact]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedContact) return;
    setSendingMessage(true);
    setError(null);
    try {
      const messagePayload = {
        toUserId: selectedContact.id,
        content: newMessage.trim(),
      };
      // Send message to API
      await apiService.sendMessage(messagePayload);
      // Refresh messages after sending
      const updatedMessages = await apiService.getMessages(selectedContact.id);
      setMessages(updatedMessages);
      setNewMessage('');
    } catch (err) {
      setError(err.message);
    } finally {
      setSendingMessage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col max-w-4xl mx-auto p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold text-gray-900 dark:text-white mb-6"
      >
        Client Communication
      </motion.h1>

      <div className="flex flex-1 bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        {/* Contacts list */}
        <div className="w-72 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold">
            Contacts
          </div>
          {loadingContacts ? (
            <div className="p-4 text-gray-500">Loading contacts...</div>
          ) : error ? (
            <div className="p-4 text-red-500">{error}</div>
          ) : (
            contacts.map(contact => (
              <button
                key={contact.id}
                onClick={() => setSelectedContact(contact)}
                className={`w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none ${
                  selectedContact && selectedContact.id === contact.id
                    ? 'bg-gray-200 dark:bg-gray-700 font-semibold'
                    : 'font-normal'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <User className="w-6 h-6 text-gray-600 dark:text-gray-300" />
                  <span>{contact.name}</span>
                </div>
              </button>
            ))
          )}
        </div>

        {/* Message thread */}
        <div className="flex-1 flex flex-col">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white font-semibold">
            {selectedContact ? `Conversation with ${selectedContact.name}` : 'Select a contact'}
          </div>

          <div className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900 space-y-4">
            {loadingMessages ? (
              <div className="text-gray-500">Loading messages...</div>
            ) : messages.length === 0 ? (
              <div className="text-gray-400">No messages</div>
            ) : (
              messages.map(message => (
                <div
                  key={message.id}
                  className={`max-w-3/4 p-3 rounded ${
                    message.fromUserId === selectedContact.id
                      ? 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white self-start'
                      : 'bg-blue-600 text-white self-end'
                  }`}
                >
                  <div className="text-sm">{message.content}</div>
                  <div className="text-xs text-gray-500 mt-1">{new Date(message.timestamp).toLocaleString()}</div>
                </div>
              ))
            )}
          </div>

          {selectedContact && (
            <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 flex items-center space-x-3">
              <input
                type="text"
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                className="flex-1 px-3 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Type your message"
                disabled={sendingMessage}
                onKeyDown={e => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
              />
              <button
                onClick={handleSendMessage}
                disabled={sendingMessage || newMessage.trim() === ''}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                aria-label="Send message"
              >
                <Send className="w-5 h-5" />
                <span>Send</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientCommunication;
