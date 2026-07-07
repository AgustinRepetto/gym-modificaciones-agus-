package org.gym.service.customer;


import lombok.RequiredArgsConstructor;
import org.gym.dto.response.customer.CustomerResponse;
import org.gym.dto.request.customer.CustomerUpdateRequest;
import org.gym.model.customer.Customer;
import org.gym.repository.customer.JpaCustomerRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.BeanWrapper;
import org.springframework.beans.BeanWrapperImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class CustomerUpdaterService {
    private final JpaCustomerRepository jpaCustomerRepository;
    private final CustomerFinderService customerFinderService;

    //sí hay error hace RollBack
    @Transactional
    public CustomerResponse update(CustomerUpdateRequest request, Long id){
        Customer customer = customerFinderService.find(id);

        //declaramos un arreglo de propiedades ignoradas y lo igualamos a los que obtenemos
        String[] ignoredProperties = getNullAndFixedPropertyNames(request);
        //get y set tradicional, ignora los que les pasamos
        BeanUtils.copyProperties(request, customer, ignoredProperties);

        Customer updated = jpaCustomerRepository.save(customer);
        return CustomerResponse.fromEntity(updated);
    }
//object source es un método universal, puede ir cualquier cosa
    private String[] getNullAndFixedPropertyNames(Object source){
        //para buscar que hay dentro, se envuelve el DTO
        final BeanWrapper src = new BeanWrapperImpl(source);
        //mira el dto, y arma la lista
        //escanea metodos public -> detecta los 'get' -> y le quita el prefijo (Get)
        java.beans.PropertyDescriptor[] pds = src.getPropertyDescriptors();

        //se crea una bolsa vacía, para indicar que campos no se van a actualizar
        //solo para strings
        //y hashSet mete los elementos a la lista, y si se actualizan algunos, los nulos entran aca también
        Set<String> emptyNames = new HashSet<>();

        //por default pasamos estos para que no se modifiquen
        emptyNames.add("id");
        emptyNames.add("birthDate");
        emptyNames.add("registrationDate");

        //recorre las propiedades del DTO, si es null entra en emptyNames (o sea no se actualiza)
        for(java.beans.PropertyDescriptor pd :pds){
            Object srcValue = src.getPropertyValue(pd.getName());
            if(srcValue == null){
                emptyNames.add(pd.getName());
            }
        }
        //mete los ignorados al arreglo
        String[] result = new String[emptyNames.size()];
        return emptyNames.toArray(result);
    }
}
