import "./MessagesTable.scss";
import DeleteMessage from "../DeleteMessage/DeleteMessage";
import EditMessage from "../EditMessage/EditMessage";
import ViewMessage from "../ViewMessage/ViewMessage";

function MessagesTable({
  messages = [],
  associatedFeasts = [],
  messageTags = [],
}) {
  if (!messages.length) {
    return (
      <div className="messages-table--empty">
        <p>No priest messages have been added yet.</p>
      </div>
    );
  }

  return (
    <div className="messages-table">
      {messages.map((message) => {
        const associatedFeast = associatedFeasts.find(
          (feast) => feast.id === message.associated_feast_id
        );

        return (
          <div className="messages-table__row" key={message.id}>
            <div className="messages-table__content">
              <div className="messages-table__row-header">
                <div>
                  <h3 className="messages-table__title">
                    {message.title_bg || "Untitled message"}
                  </h3>
                  {associatedFeast && (
                    <p className="messages-table__feast">
                      {associatedFeast.name_bg || associatedFeast.name_en}
                    </p>
                  )}
                </div>
              </div>

              <p className="messages-table__preview">
                {message.message_bg || "No message text yet."}
              </p>
            </div>

            <div className="messages-table__actions">
              <ViewMessage message={message} />
              <EditMessage
                single={message}
                associatedFeasts={associatedFeasts}
                messageTags={messageTags}
              />
              <DeleteMessage id={message.id} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MessagesTable;
