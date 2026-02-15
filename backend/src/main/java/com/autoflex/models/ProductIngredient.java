package com.autoflex.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "product_ingredients")
public class ProductIngredient extends PanacheEntity {

    @ManyToOne // Relacionamento com o produto
    public Product product;

    @ManyToOne // Relacionamento com a matéria-prima
    public RawMaterial rawMaterial;

    public Double quantityRequired;
}