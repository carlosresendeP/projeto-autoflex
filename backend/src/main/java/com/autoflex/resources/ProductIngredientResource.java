package com.autoflex.resources;

import com.autoflex.models.Product;
import com.autoflex.models.RawMaterial;
import com.autoflex.models.ProductIngredient;

import com.autoflex.models.ProductIngredient;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/ingredients")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class ProductIngredientResource {

    @GET
    public List<ProductIngredient> listAll() {
        return ProductIngredient.listAll();
    }

    @POST
    @Transactional
    public Response addIngredient(ProductIngredient ingredient) {
        // O Panache vai salvar a relação entre o Product ID e o RawMaterial ID
        ingredient.persist();
        return Response.status(Response.Status.CREATED).entity(ingredient).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public RawMaterial update(@PathParam("id") Long id, RawMaterial material) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.code = material.code;
        entity.name = material.name;
        entity.stockQuantity = material.stockQuantity;
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public void delete(@PathParam("id") Long id) {
        RawMaterial entity = RawMaterial.findById(id);
        if (entity == null) {
            throw new NotFoundException();
        }
        entity.delete();
    }
}