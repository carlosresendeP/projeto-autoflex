package com.autoflex.models;

import java.math.BigDecimal;

public class ProductionSuggestionDTO {
    public String productName;
    public Long quantityToProduce;
    public BigDecimal totalValue;

    public ProductionSuggestionDTO(String name, Long qty, BigDecimal val) {
        this.productName = name;
        this.quantityToProduce = qty;
        this.totalValue = val;
    }
}