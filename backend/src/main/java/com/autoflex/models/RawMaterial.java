package com.autoflex.models;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "raw_materials")
public class RawMaterial extends PanacheEntity {
    public String code;
    public String name;
    public Double stockQuantity;
}