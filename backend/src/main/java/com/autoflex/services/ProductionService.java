package com.autoflex.services;

import com.autoflex.models.*;
import jakarta.enterprise.context.ApplicationScoped;
import java.math.BigDecimal;
import java.util.*;
import java.util.stream.Collectors;

@ApplicationScoped
public class ProductionService {

    public List<ProductionSuggestionDTO> getSuggestion() {
        // 1. Pegar todos os produtos e ordenar pelo MAIOR valor (Regra de Negócio)
        List<Product> products = Product.listAll();
        products.sort(Comparator.comparing(p -> ((Product)p).value).reversed());

        List<ProductionSuggestionDTO> suggestions = new ArrayList<>();
        
        // Simulação de estoque temporário para o cálculo
        Map<Long, Double> tempStock = RawMaterial.<RawMaterial>listAll().stream()
                .collect(Collectors.toMap(m -> m.id, m -> m.stockQuantity));

        for (Product product : products) {
            long canProduce = Long.MAX_VALUE;
            List<Composition> ingredients = Composition.find("product", product).list();

            if (ingredients.isEmpty()) continue;

            // 2. Calcular o gargalo (menor quantidade possível baseada no insumo)
            for (Composition ing : ingredients) {
                double available = tempStock.getOrDefault(ing.rawMaterial.id, 0.0);
                long possibleWithThisIng = (long) (available / ing.quantityRequired);
                canProduce = Math.min(canProduce, possibleWithThisIng);
            }

            if (canProduce > 0) {
                suggestions.add(new ProductionSuggestionDTO(
                    product.name, 
                    canProduce, 
                    product.value.multiply(BigDecimal.valueOf(canProduce))
                ));
                
                // 3. Abater do estoque temporário para o próximo produto da lista
                for (Composition ing : ingredients) {
                    double current = tempStock.get(ing.rawMaterial.id);
                    tempStock.put(ing.rawMaterial.id, current - (canProduce * ing.quantityRequired));
                }
            }
        }
        return suggestions;
    }
}