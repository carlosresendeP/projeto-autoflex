package com.autoflex.models;


import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "raw_materials")
public class RawMaterial extends BaseEntity {
    public String code;
    public String name;
    public Double stockQuantity;
}