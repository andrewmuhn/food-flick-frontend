import { DinnerParty } from "../models/DinnerParty";
import dinnerPartyApiInstance from "../utils/DinnerPartyApiInstance";

export const postNewDinnerParty = async (dinnerParty: DinnerParty) => {
  try {
    const response = await dinnerPartyApiInstance.post<DinnerParty>(
      "/dinner-party",
      dinnerParty
    );
    return response.data;
  } catch (error) {
    console.error("Failed to post new dinner party:\n", error);
    throw error;
  }
};

export const getAllDinnerParties = async (): Promise<DinnerParty[]> => {
  try {
    const response = await dinnerPartyApiInstance.get<DinnerParty[]>(
      "/dinner-party"
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dinner parties:\n", error);
    throw error;
  }
};

export const getDinnerPartyById = async (
  dinnerPartyId: number
): Promise<DinnerParty> => {
  try {
    const response = await dinnerPartyApiInstance.get<DinnerParty>(
      `/dinner-party/${dinnerPartyId}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch dinner parties:\n", error);
    throw error;
  }
};

export const updateDinnerPartyById = async (
  dinnerPartyId: number
): Promise<void> => {
  try {
    await dinnerPartyApiInstance.put<DinnerParty>(
      `/dinner-party/${dinnerPartyId}`
    );
  } catch (error) {
    console.error("Failed to update dinner party:\n", error);
  }
};

export const updateDinnerPartyLocationById = async (
    dinnerPartyId: number, dinnerParty:DinnerParty
  ): Promise<void> => {
    try {
      await dinnerPartyApiInstance.put<DinnerParty>(
        `/dinner-party/${dinnerPartyId}/location`,
        dinnerParty
      );
    } catch (error) {
      console.error("Failed to update dinner party:\n", error);
    }
  };

export const lockVotes = async (dinnerPartyId: number): Promise<void> => {
  try {
    await dinnerPartyApiInstance.put<DinnerParty>(
      `/dinner-party/${dinnerPartyId}/lock`
    );
  } catch (error) {
    console.error("Failed to update dinner party:\n", error);
  }
};
