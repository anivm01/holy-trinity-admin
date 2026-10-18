import MessagesTable from "../../components/Messages/MessagesTable/MessagesTable";
import messagesData from "../../data/priestMessages.json";

import "./MessagesPage.scss";

function MessagesPage() {
  return (
    <main className="messages-page">
      <div className="messages-page__header">
        <h1>Priest Messages</h1>
        <p>View and manage messages from the priest.</p>
      </div>

      <MessagesTable
        messages={messagesData.priestMessages}
        associatedFeasts={messagesData.associatedFeasts}
        messageTags={messagesData.messageTags}
      />
    </main>
  );
}

export default MessagesPage;
