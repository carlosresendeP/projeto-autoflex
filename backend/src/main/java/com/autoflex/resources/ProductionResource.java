package com.autoflex.resources;

import com.autoflex.services.ProductionService;
import com.autoflex.models.ProductionSuggestionDTO;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import java.util.List;

@Path("/production")
@Produces(MediaType.APPLICATION_JSON)
public class ProductionResource {

    @Inject
    ProductionService productionService;

    @GET
    @Path("/suggestion")
    public List<Productio
    
    SuggestionDTO> suggest() {
        return productionService.getSuggestion();
    }
}