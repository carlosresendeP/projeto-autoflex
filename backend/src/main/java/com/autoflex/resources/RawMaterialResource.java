package com.autoflex.resources;

import com.autoflex.models.RawMaterial;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/materials")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class RawMaterialResource {

    @GET
    public List<RawMaterial> listAll() {
        return RawMaterial.listAll();
    }

    @POST
    @Transactional
    public Response create(RawMaterial material) {
        material.persist();
        return Response.status(Response.Status.CREATED).entity(material).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException("Matéria-prima não encontrada.");
        }

        if (material.code != null) entity.code = material.code;
        if (material.name != null) entity.name = material.name;
        if (material.stockQuantity != null) entity.stockQuantity = material.stockQuantity;

        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = RawMaterial.deleteById(id);
        if (!deleted) {
            throw new NotFoundException();
        }
        return Response.noContent().build();
    }
}