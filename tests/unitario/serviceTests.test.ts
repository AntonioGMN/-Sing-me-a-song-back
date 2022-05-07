import { jest } from "@jest/globals";
import { recommendationService, CreateRecommendationData } from "../../src/services/recommendationsService.js"
import { recommendationRepository } from "../../src/repositories/recommendationRepository.js"
import { Prisma, Recommendation} from "@prisma/client";

describe("Service Tests", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.resetAllMocks();
  }); 

  const erroNotFound = { type: "not_found", message: "" }
  const recommendation: Recommendation = {
    id: 1,
    name: "",
    youtubeLink: "",
    score: -10, 
  }

  it("return erro from a invalid name on insert", async () => {
    const recommendationInvalid: CreateRecommendationData = {
      name: "",
      youtubeLink: ""
    };

    
    jest.spyOn(recommendationRepository, "findByName").mockResolvedValue(recommendation);

    await expect(recommendationService.insert(recommendationInvalid)).rejects.toEqual({ type: "conflict", message: "Recommendations names must be unique" })
  });
  

  it("remove recommendation from score under 5 on downvote", async ()=>{
    const invalidId = 0;
    
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(recommendation)
    jest.spyOn(recommendationRepository, "updateScore").mockResolvedValue(recommendation)

    const removeRecommendation = jest.spyOn(recommendationRepository, "remove").mockResolvedValue(null)
    
    await recommendationService.downvote(invalidId)

    expect(removeRecommendation).toBeCalledTimes(1);
  })

  it("thorw error for a invalid id on getByIdOrFail", async ()=>{
    const invalidId = 0;
    
    jest.spyOn(recommendationRepository, "find").mockResolvedValue(null)
    await expect(recommendationService.downvote(invalidId)).rejects.toEqual(erroNotFound)
  })

  it("thow erro on getRandom", async ()=>{
    const arrayRecommendations = [];

    jest.spyOn(recommendationRepository, "findAll").mockResolvedValue(arrayRecommendations);
    await expect(recommendationService.getRandom()).rejects.toEqual(erroNotFound)
  })
});