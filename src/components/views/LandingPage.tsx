import React, { useEffect, useState } from "react";
import CreatePartyModal from "../CreatePartyModal"; // Adjust path as needed
import FilterRestaurantModal from "../FilterRestaurantModal"; // Adjust path as needed
import { DinnerParty } from "../../models/DinnerParty";
import Dropdown from "../Dropdown";
import { getAllDinnerParties } from "../../services/DinnerPartyService";
import LoadingState from "../LoadingState";

const LandingPage: React.FC = () => {
  const [isPartyModalOpen, setIsPartyModalOpen] = useState<boolean>(false);
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] =
    useState<boolean>(false);

  const [dinnerPartyId, setDinnerPartyId] = useState<number>(1);
  const [dinnerParties, setDinnerParties] = useState<DinnerParty[]>([]);
  //   const [hostedDinnerParties, setHostedDinnerParties] = useState<DinnerParty[]>(
  //     []
  //   );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleCreateParty = () => {
    setIsPartyModalOpen(true);
  };

  const handlePartyModalSubmit = (dinnerParty: DinnerParty) => {
    setIsPartyModalOpen(false);
    setDinnerPartyId(dinnerParty.dinner_party_id);
    setIsRestaurantModalOpen(true);
  };

  const handleRedirect = (dinnerPartyId: number, finalized: boolean) => {
    // Redirect or proceed to /vote
    if (finalized) {
      window.location.href = `/dinnerparty/${dinnerPartyId}/results`;
    } else {
      window.location.href = `/dinnerparty/${dinnerPartyId}`;
    }
  };

  useEffect(() => {
    const fetchDinnerParties = async () => {
      try {
        const response = await getAllDinnerParties();
        setDinnerParties(response);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch dinner parties");
        setLoading(false);
      }
    };
    fetchDinnerParties();
  }, []);

  if (error) {
    return <div className="bg-beige min-h-screen">{error}</div>;
  }

  return (
    <div className="bg-beige min-h-screen">
      <div
        className={`${isPartyModalOpen || isRestaurantModalOpen ? "blur" : ""}`}
      >
        {/* Hero Image */}
        <div className="relative">
          {/* Hero Image */}
          <div className="relative h-64 bg-gray-800">
            <img
              src="https://foodflickimages.s3.us-east-2.amazonaws.com/assets/foodflick.jpg"
              alt="Hero"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
            {/* Overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <h1 className="text-7xl font-bold text-white text-center">
                Welcome to FoodFlick!
              </h1>
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-beige min-h-screen">
          <LoadingState loadingMessage={"Finding dinner parties..."} />
        </div>
      ) : (
        <>
          <div
            className={`p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 mt-8 ${
              isPartyModalOpen || isRestaurantModalOpen ? "blur" : ""
            }`}
          >
            {/* <PartyDropdowns
          selectedDinnerParty={selectedDinnerParty}
          setSelectedDinnerParty={setSelectedDinnerParty}
          selectedHostedParty={selectedHostedParty}
          setSelectedHostedParty={setSelectedHostedParty}
          handleCreateParty={handleCreateParty}
          /> */}

            <Dropdown
              dinnerParties={dinnerParties}
              handleRedirect={handleRedirect}
            />

            <button
              onClick={handleCreateParty}
              className="w-60 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green hover:bg-green-dark focus:bg-green-dark focus:outline-none"
            >
              Create party
            </button>
          </div>

          <CreatePartyModal
            isOpen={isPartyModalOpen}
            onClose={() => setIsPartyModalOpen(false)}
            handlePartyModalSubmit={handlePartyModalSubmit}
          />

          <FilterRestaurantModal
            isOpen={isRestaurantModalOpen}
            handleRedirect={handleRedirect}
            dinnerPartyId={dinnerPartyId}
          />
        </>
      )}
    </div>
  );
};

export default LandingPage;
