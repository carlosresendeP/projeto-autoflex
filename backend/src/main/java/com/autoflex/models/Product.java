package com.autoflex.models;

import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import java.math.BigDecimal;

@Entity
@Table(name = "products")
public class Product extends BaseEntity {
    public String code;
    public String name;
    public BigDecimal value;
}