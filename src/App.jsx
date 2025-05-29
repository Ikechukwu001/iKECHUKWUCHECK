import React, { useState } from 'react';
import data from './data/Symptoms.json';
import './index.css';

export default function App() {
  const [input, setInput] = useState('');
  const [symptomList, setSymptomList] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [showDisclaimer, setShowDisclaimer] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const allSymptoms = [...new Set(data.flatMap(c => c.symptoms))];

  const handleInput = (e) => {
    const val = e.target.value;
    setInput(val);
    if (val.length > 1) {
      const filtered = allSymptoms.filter(s =>
        s.toLowerCase().includes(val.toLowerCase()) &&
        !symptomList.includes(s)
      );
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const addSymptom = (symptom) => {
    setSymptomList(prev => [...prev, symptom]);
    setInput('');
    setSuggestions([]);
  };

  const checkAilments = () => {
    const matched = data.filter(cond =>
      cond.symptoms.filter(symp => symptomList.includes(symp)).length >= 2
    );
    setResults(matched);
  };

  return (
    <>
    <div className="min-h-screen bg-green-50 text-gray-800 p-6">
      <h1 className="text-3xl font-bold text-center text-green-700 mb-4">IKECHUKWU-CHECK</h1>

      {/* Collapsible Disclaimer */}
      <div className="bg-white border-l-4 border-yellow-400 p-4 mb-4">
        <div
          className="flex justify-between items-center cursor-pointer text-yellow-700 font-semibold"
          onClick={() => setShowDisclaimer(!showDisclaimer)}
        >
          <span>⚠️ Disclaimer</span>
          <span>{showDisclaimer ? '▲' : '▼'}</span>
        </div>
        {showDisclaimer && (
          <p className="mt-2 text-sm">
            This app is for informational purposes only and does not replace professional medical advice, diagnosis, or treatment. Always consult with a licensed healthcare provider.
          </p>
        )}
      </div>

      {/* Collapsible How to Use */}
      <div className="bg-green-100 border border-green-300 p-4 rounded mb-6">
        <div
          className="flex justify-between items-center cursor-pointer text-green-800 font-semibold"
          onClick={() => setShowInstructions(!showInstructions)}
        >
          <span>📘 How to Use</span>
          <span>{showInstructions ? '▲' : '▼'}</span>
        </div>
        {showInstructions && (
          <ol className="list-decimal list-inside text-green-700 mt-2 text-sm">
            <li>Type a symptom in the input box below.</li>
            <li>Select from the suggested options to add symptoms.</li>
            <li>Once 3 or more symptoms are selected, click the "Check Ailment" button.</li>
            <li>You'll see possible conditions based on your selection.</li>
          </ol>
        )}
      </div>

      <p className="text-center mb-6 font-medium text-green-700">Enter at least 3 symptoms to find possible conditions.</p>

      <input
        type="text"
        value={input}
        onChange={handleInput}
        className="w-full p-2 border border-green-300 rounded mb-2"
        placeholder="Enter a symptom..."
      />

      {suggestions.length > 0 && (
        <ul className="bg-white border rounded shadow mb-2">
          {suggestions.map((s, i) => (
            <li
              key={i}
              className="p-2 cursor-pointer hover:bg-green-100"
              onClick={() => addSymptom(s)}
            >
              {s}
            </li>
          ))}
        </ul>
      )}

      {symptomList.length > 0 && (
        <div className="mb-4">
          <p className="font-semibold">Selected Symptoms:</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {symptomList.map((s, i) => (
              <span key={i} className="bg-green-200 px-3 py-1 rounded-full text-sm">{s}</span>
            ))}
          </div>
        </div>
      )}

      {symptomList.length >= 3 && (
        <button
          onClick={checkAilments}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Check Ailment
        </button>
      )}

      {results.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Possible Conditions:</h2>
          {results.map((res, i) => (
            <div key={i} className="bg-white border border-green-200 rounded p-4 mb-4">
              <h3 className="text-xl font-bold text-green-800">{res.name}</h3>
              <p><strong>Symptoms:</strong> {res.symptoms.join(', ')}</p>
              <p><strong>Description:</strong> {res.description}</p>
              <p><strong>Causes:</strong> {res.causes}</p>
              <p><strong>Treatment:</strong> {res.treatment}</p>
              {res.homeRemedy && (
                <p><strong>Home Remedy:</strong> {res.homeRemedy}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
    <div className='bg-green-50 p-4 border-t border-green-200'>
      <p className="text-center text-sm text-gray-500 mt-6">
        © 2025 iKECHUKWUFRONTEND. All rights reserved.
      </p>
    </div>
    </>
  );
}
