using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.SignalR;
using AngularSignalRChat.Cors;
using System.Collections.Concurrent;
using System.Threading.Tasks;

namespace AngularSignalRChat
{
    public class ChatHub : Hub
    {
        public void Hello()
        {
            Clients.All.hello();
        }

        static ConcurrentDictionary<string, ChatData.User> _userConnections = new ConcurrentDictionary<string, ChatData.User>();


        private static void ActivateChat(string userName, string contactName)
        {
            var user = GetContactByName(userName);
            var contact = GetContactByName(contactName);

            if (user != null)
                user.ActiveContact = contact;

            if (contact != null)
                contact.ActiveContact = user;
        }

        private static ChatData.User GetContactByName(string name)
        {
            name = name.ToLower().Trim();
            return _userConnections.Where(u => u.Value.Name.Equals(name, StringComparison.OrdinalIgnoreCase)).FirstOrDefault().Value;
        }

        public override Task OnConnected()
        {
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            return base.OnDisconnected(stopCalled);
        }

        private ChatData.User GetOrRegisterUser(string name)
        {
            var user = ChatData.Instance.Users.FirstOrDefault(u => u.Name == name);
            if (user != null)
                return user;

            // register
            else if (!string.IsNullOrWhiteSpace(name))
            {
                user = new ChatData.User()
                {
                    Name = name,
                };

                ChatData.Instance.Users.Add(user);
                ChatData.Instance.Save();

                return user;
            }

            else
                return null;
        }

        public void Connect(string name, string contact)
        {
            var pair = _userConnections.FirstOrDefault(u => u.Value.Name == name);
            if (pair.Value != null)
            {
                if (!_userConnections.TryRemove(pair.Key, out ChatData.User value))
                    return;
            }

            var newUser = GetOrRegisterUser(name);
            newUser.ConnectionId = Context.ConnectionId;            

            if (!_userConnections.TryAdd(name, newUser))
                return;

            ActivateChat(name, contact);

            // Update contacts list of other clients
            Clients.Others.clearContacts();

            // add All contact, which will broadcast all messsages
            Clients.All.addContact("All", "DEP");
            Clients.Others.addContact(name, "DEP");        // front-end won't add if it is already in list            

            // and update Caller contact list
            foreach (var u in _userConnections.Values)
            {
                if (u.Name != name)
                    Clients.Caller.addContact(u.Name, "DEP");
            }


            // Load history for this client
            LoadHistory(name, contact);
        }


        private bool IsMessageInHistory(ChatData.Message historyMsg, string name, string contact)
        {
            if (historyMsg.FromUser == name && historyMsg.ToUser == contact) return true;

            if (historyMsg.ToUser == name && historyMsg.FromUser == contact) return true;

            if (contact == "All" && historyMsg.ToUser == "All") return true;

            return false;
        }


        private void LoadHistory(string name, string contact)
        {
            var history = ChatData.Instance.HistoryMessages.Where(m => IsMessageInHistory(m, name, contact)).ToList();

            Clients.Caller.clearMessages();
            foreach (var msg in history)
                Clients.Caller.addNewMessageToPage(name: msg.FromUser, contact: msg.ToUser, message: msg.Content, time: msg.Time);            
        }

        public void Send(string name, string contact, string message)
        {
            string time = DateTime.Now.ToString();

            // Call the addNewMessageToPage method to update clients.
            if (contact == "All")
            {
                // we filter messages with active contacts, so it won't appear on personal chats
                Clients.All.addNewMessageToPage(name, contact, message, time);
            }

            else
            {
                var contactUser = GetContactByName(contact);
                if (contactUser?.ConnectionId != null)
                {
                    // here we have to check, if receiever is active
                    if (contactUser.ActiveContact?.Name == name)
                        Clients.Client(contactUser.ConnectionId).addNewMessageToPage(name, contact, message, time);
                }

                Clients.Caller.addNewMessageToPage(name, contact, message, time);
            }

            // save to history            
            ChatData.AddMessageToHistory(name, contact, message);
        }
    }
}