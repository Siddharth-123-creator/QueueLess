
import { useState } from "react";
import "./QueueAssistant.css";

const doctors = [
  {
    id: 1,
    name: "Dr. Ananya Sharma",
    specialty: "General Physician",
    clinic: "City Care Clinic",
    location: "Indirapuram",
    fee: 400,
    experience: 12,
  },
  {
    id: 2,
    name: "Dr. Rahul Menon",
    specialty: "Dermatology",
    clinic: "Sunrise Skin & Dental Care",
    location: "Vaishali",
    fee: 700,
    experience: 9,
  },
  {
    id: 3,
    name: "Dr. Priya Kapoor",
    specialty: "Dentistry",
    clinic: "Sunrise Skin & Dental Care",
    location: "Vaishali",
    fee: 500,
    experience: 7,
  },
  {
    id: 4,
    name: "Dr. Sameer Khan",
    specialty: "Pediatrics",
    clinic: "Little Steps Child & ENT Centre",
    location: "Kaushambi",
    fee: 600,
    experience: 15,
  },
  {
    id: 5,
    name: "Dr. Neha Arora",
    specialty: "ENT",
    clinic: "Little Steps Child & ENT Centre",
    location: "Kaushambi",
    fee: 550,
    experience: 10,
  },
];

const symptomRules = [
  {
    specialty: "Dentistry",
    keywords: [
      "toothache", "tooth pain", "teeth pain", "tooth",
      "teeth", "toothpaste", "gum pain", "dental",
      "daant", "dant", "daanto", "masood",
    ],
  },
  {
    specialty: "Dermatology",
    keywords: [
      "skin", "rash", "itch", "itching", "pimple",
      "pimples", "acne", "eczema", "dry skin",
      "hair fall", "hairfall", "dandruff", "khujli",
      "daane", "chakte",
    ],
  },
  {
    specialty: "Pediatrics",
    keywords: [
      "my child", "my baby", "my son", "my daughter",
      "for my child", "for my baby", "my kid",
      "bachche", "bacche", "bache", "mere bacche",
      "baby doctor", "child doctor",
    ],
  },
  {
    specialty: "ENT",
    keywords: [
      "ear pain", "earache", "ear infection", "hearing",
      "nose problem", "sinus", "throat pain",
      "sore throat", "tonsil", "voice problem",
      "kaan", "gale mein", "gale me", "naak",
    ],
  },
  {
    specialty: "General Physician",
    keywords: [
      "fever", "bukhar", "cough", "khansi",
      "cold", "sardi", "headache", "head pain",
      "stomach pain", "stomachache", "vomiting",
      "diarrhea", "weakness", "body pain",
      "body ache", "thakan", "pet dard",
      "sir dard", "sir mein dard", "sir me dard",
    ],
  },
];

const quickQuestions = [
  "How does my token work?",
  "How can I check waiting time?",
  "Suggest a doctor for my symptoms",
  "How do I check consultation fees?",
];

function includesKeyword(text, keyword) {
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return new RegExp(`\\b${escaped}\\b`, "i").test(text);
}

function getResponse(message) {
  const text = message.toLowerCase();

  // Urgent symptoms should not be handled as routine doctor matching.
  const urgentSymptoms = [
    "chest pain",
    "difficulty breathing",
    "can't breathe",
    "cannot breathe",
    "severe bleeding",
    "unconscious",
    "stroke symptoms",
  ];

  if (urgentSymptoms.some((word) => text.includes(word))) {
    return {
      text:
        "These symptoms may need urgent medical attention. Please contact local emergency services or go to the nearest emergency department now. Do not wait for a routine clinic appointment.",
      doctors: [],
    };
  }

  const matchedRule = symptomRules.find((rule) =>
    rule.keywords.some((keyword) => includesKeyword(text, keyword))
  );

  if (matchedRule) {
    const matches = doctors.filter(
      (doctor) => doctor.specialty === matchedRule.specialty
    );

    return {
      text:
        `Based on the symptoms you described, ${matchedRule.specialty} ` +
        "may be a suitable speciality to consider. Here are the matching " +
        "sample doctor profiles listed on QueueLess. This is not a diagnosis.",
      doctors: matches,
    };
  }

  const answers = [
    {
      keywords: ["token", "number", "position"],
      answer:
        "Your token shows your position in the clinic queue. Check the queue page for your current token status.",
    },
    {
      keywords: ["wait", "waiting", "time", "late"],
      answer:
        "Waiting time depends on the patients ahead of you and consultation duration. Check the latest queue information before visiting.",
    },
    {
      keywords: ["join", "register", "book", "appointment"],
      answer:
        "To join a clinic queue, follow the clinic's joining process. QueueLess does not assign a token just by opening this chat.",
    },
    {
      keywords: ["payment", "fee", "pay", "charges"],
      answer:
        "For consultation fees and payment status, check the information provided by your clinic or hospital staff.",
    },
    {
      keywords: ["doctor", "clinic", "address", "location", "specialist"],
      answer:
        "Tell me what problem you are experiencing, for example skin itching, tooth pain, or a throat problem. I can suggest a relevant speciality and matching sample doctors. For all listed profiles, open Find Doctors.",
    },
    {
      keywords: ["hello", "hi", "hey"],
      answer:
        "Hi! 👋 I'm QueueLess Assistant. Ask me about tokens, waiting time, clinic information, payments, or finding a doctor for your symptoms.",
    },
  ];

  const match = answers.find((item) =>
    item.keywords.some((keyword) => includesKeyword(text, keyword))
  );

  if (match) {
    return { text: match.answer, doctors: [] };
  }

  return {
    text:
      "I couldn't match that message to a speciality yet. Try describing your main problem in simple words, such as skin itching, tooth pain, ear pain, or fever. I can match it against the sample doctor profiles available on QueueLess.",
    doctors: [],
  };
}

export default function QueueAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      from: "assistant",
      text:
        "Hi! 👋 I'm QueueLess Assistant. Ask about your queue or describe your problem to explore matching sample doctors.",
      doctors: [],
    },
  ]);

  function sendMessage(text = input) {
    const question = text.trim();
    if (!question) return;

    const response = getResponse(question);

    setMessages((previous) => [
      ...previous,
      { from: "user", text: question },
      { from: "assistant", ...response },
    ]);

    setInput("");
  }

  return (
    <div className="queue-assistant">
      {isOpen && (
        <section className="queue-chat-panel">
          <header className="queue-chat-header">
            <div className="queue-chat-avatar">Q</div>
            <div>
              <strong>QueueLess Assistant</strong>
              <span>Queue help and doctor suggestions</span>
            </div>
            <button
              type="button"
              className="queue-chat-close"
              onClick={() => setIsOpen(false)}
              aria-label="Close assistant"
            >
              ×
            </button>
          </header>

          <div className="queue-chat-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`queue-chat-message ${
                  message.from === "user"
                    ? "user-message"
                    : "assistant-message"
                }`}
              >
                <div>{message.text}</div>

                {message.doctors?.length > 0 && (
                  <div className="queue-suggested-doctors">
                    {message.doctors.map((doctor) => (
                      <article
                        key={doctor.id}
                        className="queue-suggested-doctor"
                      >
                        <strong>{doctor.name}</strong>
                        <span>{doctor.specialty}</span>
                        <span>{doctor.clinic}</span>
                        <span>{doctor.location}, Ghaziabad</span>
                        <span>
                          {doctor.experience} years experience · ₹{doctor.fee}
                        </span>
                        <a href="/doctors">View doctor directory →</a>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="queue-chat-quick">
            {quickQuestions.map((question) => (
              <button
                type="button"
                key={question}
                onClick={() => sendMessage(question)}
              >
                {question}
              </button>
            ))}
          </div>

          <form
            className="queue-chat-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Describe your problem..."
              aria-label="Ask QueueLess Assistant"
            />
            <button type="submit" aria-label="Send message">
              ↑
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="queue-assistant-toggle"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close assistant" : "Open QueueLess Assistant"}
      >
        {isOpen ? "×" : "✦"}
        {!isOpen && <span>Ask QueueLess</span>}
      </button>
    </div>
  );
}
