import React from "react";
import TextMessage from "./TextMessage";
import { UserData, useUserDataContext } from "../../contexts/UserDataContext";
import TextInput from "./TextInput";
import GridRadioInput from "./GridRadioInput";
import DateRadioInput from "./DateRadioInput";
import TypingMessage from "./TypingMessage";

type Inputs =
  | {
      type: "text-input";
      data: {
        target: keyof UserData;
      };
    }
  | {
      type: "radio-input";
      data: {
        target: keyof UserData;
        items: Array<string>;
      };
    }
  | {
      type: "date-radio-input";
      data: {
        target: keyof UserData;
      };
    }
  | {
      type: "time-input";
      data: {
        target: keyof UserData;
        items: Array<string>;
      };
    }
  | {
      type: "typing";
    };

type Flow = Array<
  | {
      type: "text";
      data: {
        owner: "user" | "bot";
        text: string;
      };
    }
  | Inputs
>;
type CollapsedFlow = Array<
  | {
      type: "text";
      data: {
        owner: "user" | "bot";
        texts: string[];
      };
    }
  | Inputs
>;

const STATIC_FLOW: Flow = [
  {
    type: "text",
    data: {
      owner: "bot",
      text: "Hi! I'm {botName} from BYJU’S. I am here to help you book your free demo class.",
    },
  },
  {
    type: "typing",
  },
  {
    type: "text",
    data: {
      owner: "bot",
      text: "Please share your Email ID.",
    },
  },
  {
    type: "text-input",
    data: {
      target: "email",
    },
  },
  {
    type: "text",
    data: {
      owner: "bot",
      text: "Please select the grade.",
    },
  },
  {
    type: "radio-input",
    data: {
      target: "grade",
      items: [
        "Grade 1",
        "Grade 2",
        "Grade 3",
        "Grade 4",
        "Grade 5",
        "Grade 6",
        "Grade 7",
        "Grade 8",
        "Grade 9",
      ],
    },
  },
  {
    type: "text",
    data: {
      owner: "bot",
      text: "Now, select a date",
    },
  },
  {
    type: "date-radio-input",
    data: {
      target: "date",
    },
  },
  {
    type: "text",
    data: {
      owner: "bot",
      text: "Now, select a time slot",
    },
  },
  {
    type: "time-input",
    data: {
      target: "time",
      items: [
        "09:00 am",
        "10:00 am",
        "11:00 am",
        "12:00 pm",
        "01:00 pm",
        "02:00 pm",
        "03:00 pm",
        "04:00 pm",
        "05:00 pm",
      ],
    },
  },

  {
    type: "text",
    data: {
      owner: "bot",
      text: "Please confirm your booking for {time} on {date}.",
    },
  },
];

function collapseTexts(flow: Flow): CollapsedFlow {
  const collapsed: CollapsedFlow = [];
  for (const item of flow) {
    if (item.type !== "text") {
      collapsed.push(item);
      continue;
    }

    if (collapsed.length === 0) {
      collapsed.push({
        type: "text",
        data: {
          owner: item.data.owner,
          texts: [item.data.text],
        },
      });
      continue;
    }

    const last = collapsed[collapsed.length - 1];
    if (last.type !== "text" || last.data.owner !== item.data.owner) {
      collapsed.push({
        type: "text" as const,
        data: {
          owner: item.data.owner,
          texts: [item.data.text],
        },
      });
      continue;
    }

    last.data.texts.push(item.data.text);
  }

  return collapsed;
}

interface MessageControllerProps {
  onComplete?: () => void;
}
const MessageController: React.FC<MessageControllerProps> = ({
  onComplete,
}) => {
  const [queueIndex, setQueueIndex] = React.useState(1);
  const [isNextQueued, setIsNextQueued] = React.useState(false);
  const { data, setData } = useUserDataContext();
  const flow = React.useMemo(
    () => collapseTexts(STATIC_FLOW.slice(0, queueIndex)),
    [queueIndex]
  );

  React.useEffect(() => {
    if (isNextQueued)
      setQueueIndex((current) => Math.min(current + 1, STATIC_FLOW.length));
    setIsNextQueued(false);
  }, [isNextQueued]);

  React.useEffect(() => {
    const last = flow[flow.length - 1];
    if (last.type === "text") setIsNextQueued(true);
  }, [flow]);

  React.useEffect(() => {
    if (queueIndex === STATIC_FLOW.length) {
      onComplete?.();
    }
  }, [onComplete, queueIndex]);

  return (
    <>
      {flow.map((item, i) => {
        switch (item.type) {
          case "typing": {
            return (
              <TypingMessage key={i} onComplete={() => setIsNextQueued(true)} />
            );
          }
          case "text": {
            const { owner, texts } = item.data;
            const formattedTexts = texts.map((text) =>
              replacePlaceholders(text, data)
            );

            return <TextMessage owner={owner} texts={formattedTexts} key={i} />;
          }

          case "text-input": {
            const { target } = item.data;

            if (flow.length - 1 > i) {
              return <TextMessage owner="user" texts={[`${data[target]}`]} />;
            }
            return (
              <TextInput
                target={item.data.target}
                onComplete={(email) => {
                  setData((current) => ({ ...current, email }));
                  setIsNextQueued(true);
                }}
              />
            );
          }

          case "radio-input": {
            const { target, items } = item.data;

            if (flow.length - 1 > i) {
              return <TextMessage owner="user" texts={[`${data[target]}`]} />;
            }
            return (
              <GridRadioInput
                target={target}
                items={items}
                onComplete={(grade) => {
                  setData((current) => ({ ...current, grade }));
                  setIsNextQueued(true);
                }}
              />
            );
          }

          case "date-radio-input": {
            if (flow.length - 1 > i) {
              return (
                <TextMessage
                  owner="user"
                  texts={[`${data[item.data.target]}`]}
                />
              );
            }
            return (
              <DateRadioInput
                onComplete={(date) => {
                  setData((current) => ({ ...current, date }));
                  setIsNextQueued(true);
                }}
              />
            );
          }

          case "time-input": {
            const { target, items } = item.data;

            if (flow.length - 1 > i) {
              return <TextMessage owner="user" texts={[`${data[target]}`]} />;
            }
            return (
              <GridRadioInput
                target={target}
                items={items}
                onComplete={(time) => {
                  setData((current) => ({ ...current, time }));
                  setIsNextQueued(true);
                }}
              />
            );
          }
          default:
            break;
        }
      })}
    </>
  );
};

function replacePlaceholders(text: string, data: UserData): string {
  text = text.replace(/{time}/g, data.time || "");
  text = text.replace(/{date}/g, data.date || "");

  return text;
}

export default MessageController;
