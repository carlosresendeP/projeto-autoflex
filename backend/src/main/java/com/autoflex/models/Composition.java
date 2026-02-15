package com.autoflex.models;


import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "compositions") 
public class Composition extends BaseEntity {

    @ManyToOne
    public Product product;

    @ManyToOne
    public RawMaterial rawMaterial;

    public Double quantityRequired;
}