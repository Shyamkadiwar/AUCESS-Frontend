import React from 'react';
import { Card } from './ui/card';
import { Trophy, Clock, Users, DollarSign } from 'lucide-react';

const contests = [
  {
    id: 1,
    title: 'Web Development Championship',
    participants: 1234,
    endTime: '2h 45m',
    prize: '$500',
    entryFee: '$5',
  },
  {
    id: 2,
    title: 'Python Challenge 2024',
    participants: 892,
    endTime: '5h 30m',
    prize: '$750',
    entryFee: '$8',
  }
];

export function OngoingContests() {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Ongoing Contests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contests.map((contest) => (
          <Card key={contest.id} className="border-l-4 border-l-indigo-500">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg mb-2">{contest.title}</h3>
                <div className="flex gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {contest.participants}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {contest.endTime} left
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-2 text-green-600 font-semibold">
                  <Trophy className="w-4 h-4" />
                  {contest.prize}
                </div>
                <button className="mt-2 bg-indigo-600 text-white px-4 py-1 rounded-full text-sm hover:bg-indigo-700 transition-colors flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Join for {contest.entryFee}
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}