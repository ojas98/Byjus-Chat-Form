import React, { FC, useEffect, useRef } from "react";
import { UserData, useUserDataContext } from "../../contexts/UserDataContext";
import TextInput from "./TextInput";
import GridRadioInput from "./GridRadioInput";
import DateRadioInput from "./DateRadioInput";
import TimeRadioInput from "./TimeRadioInput";
import RadioQuestionInput from "./RadioQuestionInput";
import BotTextMessage from "./BotTextMessage";
import UserTextMessage from "./UserTextMessage";
import { useBotContext } from "../../contexts/BotContext";

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
      type: "question-input";
    };

type Flow = Array<
  | {
      type: "text";
      data: {
        text: string | FC<UserData & { botName: string }>;
      };
    }
  | Inputs
>;
type CollapsedFlow = Array<
  | {
      type: "text";
      data: {
        texts: (string | FC<UserData & { botName: string }>)[];
      };
    }
  | Inputs
>;

const STATIC_FLOW: Flow = [
  {
    type: "text",
    data: {
      text: ({ botName }) => (
        <>
          Hi! I'm {botName} from BYJU’S. I am here to help you book your free
          math demo class.
        </>
      ),
    },
  },
  {
    type: "text",
    data: {
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
      text: ({ time, date }) => (
        <>
          Please confirm your booking for<strong> {time} </strong> on
          <strong> {date} </strong>.
        </>
      ),
    },
  },
  {
    type: "question-input",
  },
  {
    type: "text",
    data: {
      text: ({ time, date }) => (
        <>
          Great your math demo class is booked for <strong> {time} </strong> on
          <strong> {date} </strong>.
        </>
      ),
    },
  },
  {
    type: "text",
    data: {
      text: "To ensure you don't miss out on your upcoming demo class, could you please share your contact number with us?",
    },
  },
  {
    type: "text-input",
    data: {
      target: "phone",
    },
  },
  {
    type: "text",
    data: {
      text: () => (
        <>
          Awesome! Here's a short video on how our 1:1 online math classes work:{" "}
          <a
            href="https://rb.gy/9ms1qt"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "blue", textDecoration: "underline" }}
          >
            Discover Byju's Math Companion
          </a>
        </>
      ),
    },
  },
  {
    type: "text",
    data: {
      text: "See you in class and have a great day!",
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
          texts: [item.data.text],
        },
      });
      continue;
    }

    const last = collapsed[collapsed.length - 1];
    if (last.type !== "text") {
      collapsed.push({
        type: "text" as const,
        data: {
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
  const { name: botName } = useBotContext();
  const chatEndRef = useRef<HTMLDivElement>(null);

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
    if (queueIndex === STATIC_FLOW.length) {
      onComplete?.();
      console.log("question", queueIndex);
    }
  }, [onComplete, queueIndex]);

  // Scroll to the bottom when the component mounts or new messages are added
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [flow]);

  return (
    <div
      // Set a maximum height for scrolling
      className="flex flex-col justify-end p-6 gap-6 min-h-full relative"
    >
      <>
        {flow.map((item, i) => {
          switch (item.type) {
            case "text": {
              const { texts } = item.data;
              const formattedTexts = texts.map((text) =>
                typeof text === "string" ? text : text({ ...data, botName })
              );

              return (
                <BotTextMessage
                  texts={formattedTexts}
                  key={`bot-${formattedTexts.join(".")}`}
                  onComplete={() => setIsNextQueued(true)}
                />
              );
            }

            case "text-input": {
              const { target } = item.data;

              if (flow.length - 1 > i) {
                return (
                  <UserTextMessage
                    key={`user-${target}`}
                    texts={[`${data[target]}`]}
                  />
                );
              }
              return (
                <TextInput
                  key={target}
                  target={target}
                  onComplete={(value) => {
                    setData((current) => ({ ...current, [target]: value }));
                    setIsNextQueued(true);
                  }}
                />
              );
            }

            case "radio-input": {
              const { target, items } = item.data;

              if (flow.length - 1 > i) {
                return (
                  <UserTextMessage
                    key={`user-${target}`}
                    texts={[`${data[target]}`]}
                  />
                );
              }
              return (
                <GridRadioInput
                  key={target}
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
                  <UserTextMessage
                    key="user-date"
                    texts={[`${data[item.data.target]}`]}
                  />
                );
              }
              return (
                <DateRadioInput
                  key={item.data.target}
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
                return (
                  <UserTextMessage
                    key={`user-${target}`}
                    texts={[`${data[target]}`]}
                  />
                );
              }
              return (
                <TimeRadioInput
                  key={target}
                  target={target}
                  items={items}
                  onComplete={(time) => {
                    setData((current) => ({ ...current, time }));
                    setIsNextQueued(true);
                  }}
                />
              );
            }

            // Inside MessageController component
            case "question-input": {
              if (flow.length - 1 > i) {
                return (
                  <UserTextMessage
                    key="user-question"
                    texts={[`${data.question}`]}
                  />
                );
              }

              return (
                <RadioQuestionInput
                  key="question"
                  onComplete={(question) => {
                    setData((current) => ({ ...current, question }));
                    setIsNextQueued(true);
                  }}
                  onReschedule={() => {
                    setQueueIndex(4);
                  }}
                />
              );
            }

            default:
              break;
          }
        })}
      </>
      <div className="h-0 absolute bottom-0" ref={chatEndRef}></div>
    </div>
  );
};

export default MessageController;
