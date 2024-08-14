import React, { useState } from 'react';
import CreatePartyModal from './CreatePartyModal'; // Adjust path as needed
import FilterRestaurantModal from './FilterRestaurantModal'; // Adjust path as needed

const LandingPage: React.FC = () => {
    const [selectedDinnerParty, setSelectedDinnerParty] = useState<string>("");
    const [selectedHostedParty, setSelectedHostedParty] = useState<string>("");
    const [isPartyModalOpen, setIsPartyModalOpen] = useState<boolean>(false);
    const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState<boolean>(false);

    const handleCreateParty = () => {
        setIsPartyModalOpen(true);
    };

    const handlePartyModalSubmit = (partyDetails: any) => {
        console.log('Party details:', partyDetails);
        setIsPartyModalOpen(false);
        setIsRestaurantModalOpen(true);
    };

    const handleApplyFilters = (filters: {
        location: string;
        radius: number;
        priceRange: number;
        isVegetarian: boolean;
        isVegan: boolean;
    }) => {
        console.log('Filters applied:', filters);
        // Redirect or proceed to /vote
        window.location.href = '/vote'; // Adjust this line based on your routing setup
    };

    return (
        <div>
            <div
                className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 ${isPartyModalOpen || isRestaurantModalOpen ? 'blur' : ''}`}
            >
                <div>
                    <label htmlFor="dinnerParties" className="block text-sm font-medium text-gray-700">Dinner Parties</label>
                    <select
                        id="dinnerParties"
                        value={selectedDinnerParty}
                        onChange={(e) => setSelectedDinnerParty(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">Select a dinner party</option>
                        {/* Add options dynamically or statically */}
                    </select>
                </div>
                <div>
                    <label htmlFor="hostedParties" className="block text-sm font-medium text-gray-700">Your hosted parties</label>
                    <select
                        id="hostedParties"
                        value={selectedHostedParty}
                        onChange={(e) => setSelectedHostedParty(e.target.value)}
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                    >
                        <option value="">Select a hosted party</option>
                        {/* Add options dynamically or statically */}
                    </select>
                </div>
                <button
                    onClick={handleCreateParty}
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
                >
                    Create party
                </button>
            </div>

            {/* Create Party Modal */}
            <CreatePartyModal
                isOpen={isPartyModalOpen}
                onClose={() => setIsPartyModalOpen(false)}
                onSubmit={handlePartyModalSubmit}
            />

            {/* Filter Restaurant Modal */}
            <FilterRestaurantModal
                isOpen={isRestaurantModalOpen}
                onClose={() => setIsRestaurantModalOpen(false)}
                onApplyFilters={handleApplyFilters}
            />
        </div>
    );
};

export default LandingPage;