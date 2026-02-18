package com.autoflex.resources;

import com.autoflex.models.Product;
import com.autoflex.models.RawMaterial;
import com.autoflex.models.Composition;

import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import java.util.List;

@Path("/compositions")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompositionResource {

    @GET
    public List<Composition> listAll() {
        return Composition.listAll();
    }

    @POST
    @Transactional
    public Response addComposition(Composition composition) {
        Product p = Product.findById(composition.product.id);
        RawMaterial m = RawMaterial.findById(composition.rawMaterial.id);

        if (p == null || m == null) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Product or Material not found").build();
        }

        // TRAVA DE SEGURANÇA: Verifica se já existe essa combinação
        Composition existing = Composition.find("product = ?1 and rawMaterial = ?2", p, m).firstResult();
        if (existing != null) {
            return Response.status(Response.Status.CONFLICT)
                           .entity("This composition already exists. Use PUT to update the quantity.").build();
        }

        composition.product = p;
        composition.rawMaterial = m;
        composition.persistAndFlush();

        return Response.status(Response.Status.CREATED).entity(Composition.findById(composition.id)).build();
    }

    @PUT
    @Path("/{id}")
    @Transactional
    public Composition update(@PathParam("id") Long id, Composition composition) {
        Composition entity = Composition.findById(id);
        if (entity == null) {
            throw new NotFoundException("Composition not found");
        }

        if (composition.quantityRequired != null) entity.quantityRequired = composition.quantityRequired;
        
        if (composition.product != null && composition.product.id != null) {
            Product p = Product.findById(composition.product.id);
            if (p != null) entity.product = p;
        }

        if (composition.rawMaterial != null && composition.rawMaterial.id != null) {
            RawMaterial m = RawMaterial.findById(composition.rawMaterial.id);
            if (m != null) entity.rawMaterial = m;
        }

        entity.persistAndFlush();
        return entity;
    }

    @DELETE
    @Path("/{id}")
    @Transactional
    public Response delete(@PathParam("id") Long id) {
        boolean deleted = Composition.deleteById(id);
        
        if (!deleted) {
            throw new NotFoundException("Association with ID " + id + " not found.");
        }
        
        return Response.ok(id + " deleted successfully").build();
    }
}