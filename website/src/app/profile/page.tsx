'use client';

import { useEffect, useState } from 'react';

// Mock user ID for now
const USER_ID = 1;

export default function ProfilePage() {
  const [categories, setCategories] = useState<string[]>([]);
  const [availableCategories, setAvailableCategories] = useState([
    'Electronics',
    'Apparel',
    'Books',
    'Home Goods',
  ]);

  useEffect(() => {
    async function fetchPreferences() {
      const res = await fetch(`http://localhost:3004/preferences/${USER_ID}`);
      const data = await res.json();
      setCategories(data.categories);
    }
    fetchPreferences();
  }, []);

  const handleCheckboxChange = (category: string) => {
    if (categories.includes(category)) {
      setCategories(categories.filter((c) => c !== category));
    } else {
      setCategories([...categories, category]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`http://localhost:3004/preferences/${USER_ID}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ categories }),
    });
    alert('Preferences saved!');
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold my-8">User Profile</h1>
      <h2 className="text-2xl font-bold mb-4">Your Preferences</h2>
      <form onSubmit={handleSubmit}>
        {availableCategories.map((category) => (
          <div key={category} className="mb-2">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox"
                checked={categories.includes(category)}
                onChange={() => handleCheckboxChange(category)}
              />
              <span className="ml-2">{category}</span>
            </label>
          </div>
        ))}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" type="submit">
          Save Preferences
        </button>
      </form>
    </div>
  );
}
