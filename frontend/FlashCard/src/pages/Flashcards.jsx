import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { NavBarDash } from "../components/NavbarDash";

export const Flashcards = () => {
  const [flashcardsByClass, setFlashcardsByClass] = useState({});
  const [expandedClass, setExpandedClass] = useState(null);
  const [expandedDates, setExpandedDates] = useState({});
  const navigate = useNavigate();
  const user = getAuth().currentUser;

  useEffect(() => {
    const fetchFlashcards = async () => {
      if (!user) {
        navigate("/login");
        return;
      }

      try {
        const res = await fetch(`http://localhost:5050/flashcards/${user.uid}`);
        const data = await res.json();
        setFlashcardsByClass(data);
      } catch (err) {
        console.error("Error fetching flashcards", err);
      }
    };

    fetchFlashcards();
  }, [user, navigate]);

  const toggleClass = (className) => {
    setExpandedClass(expandedClass === className ? null : className);
  };

  const toggleDate = (subject, date) => {
    setExpandedDates((prev) => {
      const current = prev[subject] || {};
      return {
        ...prev,
        [subject]: {
          ...current,
          [date]: !current[date],
        },
      };
    });
  };

  const groupByDate = (cards) => {
    const grouped = {};
    cards.forEach((card) => {
      const date = new Date(card.created_at).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      if (!grouped[date]) grouped[date] = [];
      grouped[date].push(card);
    });
    return grouped;
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <NavBarDash />
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">Your Flashcards</h1>

        {Object.keys(flashcardsByClass).length === 0 ? (
          <p className="text-gray-400">No flashcards available.</p>
        ) : (
          Object.entries(flashcardsByClass).map(([subject, cards]) => {
            const groupedByDate = groupByDate(cards);
            return (
              <div key={subject} className="mb-6 border border-gray-700 rounded-xl bg-gray-800">
                {/* Subject Toggle */}
                <button
                  onClick={() => toggleClass(subject)}
                  className="w-full text-left px-6 py-4 bg-gray-800 hover:bg-gray-700 flex justify-between items-center rounded-t-xl"
                >
                  <span className="text-xl font-semibold">{subject}</span>
                  <ChevronDownIcon
                    className={`h-6 w-6 transform transition-transform ${
                      expandedClass === subject ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>

                {expandedClass === subject && (
                  <div className="p-6 space-y-8">
                    {Object.entries(groupedByDate).map(([date, cardsOnDate]) => (
                      <div key={date}>
                        {/* Date Toggle */}
                        <button
                          onClick={() => toggleDate(subject, date)}
                          className="w-full text-left mb-2 text-indigo-300 font-medium hover:underline flex justify-between items-center"
                        >
                          <span>{date}</span>
                          <ChevronDownIcon
                            className={`h-5 w-5 transform transition-transform ${
                              expandedDates[subject]?.[date] ? "rotate-180" : "rotate-0"
                            }`}
                          />
                        </button>

                        {/* Flashcards under Date */}
                        {expandedDates[subject]?.[date] && (
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {cardsOnDate.map((card, idx) => (
                              <div
                                key={idx}
                                className="bg-gray-900 p-5 rounded-xl border border-gray-700 shadow-md transition hover:shadow-lg"
                              >
                                <p className="text-indigo-400 font-semibold mb-2">
                                  Q: {card.Question}
                                </p>
                                <p className="text-gray-300">A: {card.Answer}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
