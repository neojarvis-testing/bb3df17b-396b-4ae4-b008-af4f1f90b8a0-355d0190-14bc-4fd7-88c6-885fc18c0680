package com.examly.springapp;

import org.springframework.boot.test.context.SpringBootTest;


import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import java.lang.reflect.Field;  // Import the Field class

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(classes = SpringappApplication.class)
@AutoConfigureMockMvc
class SpringappApplicationTests {
	
	 @Autowired
	    private MockMvc mockMvc;
	 
		@Test
		@Order(1)
	    public void backend_testGetAllProducts() throws Exception {
	        mockMvc.perform(get("/api/products")
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isOk())
	        .andDo(print())
	        .andExpect(content().contentType("application/json"))
		.andExpect(jsonPath("$").isArray())
		.andReturn();
	    }
	    
		
	    @Test
		@Order(2)
	    public void backend_testGetAllReviews() throws Exception {

	        mockMvc.perform(get("/api/reviews")
			.contentType(MediaType.APPLICATION_JSON))
			.andExpect(MockMvcResultMatchers.status().isOk())
	        .andDo(print())
	        .andExpect(content().contentType("application/json"))
		.andExpect(jsonPath("$").isArray())
		.andReturn();
	    }
	    
	    @Test
	    public void backend_testReviewHasManyToOneAnnotation() {
	        try {
	            // Use reflection to get the Class object for the Course class
	            Class<?> courseClass = Class.forName("com.examly.springapp.model.Review");

	            // Get all declared fields in the Course class
	            Field[] declaredFields = courseClass.getDeclaredFields();

	            // Check each field for the @OneToOne annotation
	            boolean hasOneToOne = false;
	            for (Field field : declaredFields) {
	                if (field.isAnnotationPresent(ManyToOne.class)) {
	                	hasOneToOne = true;
	                    break; // Stop checking once we find one field with @OneToMany
	                }
	            }
		
		
	            // If no field with @OneToMany is found, fail the test
	            if (!hasOneToOne) {
	                fail("No field with @ManyToOne annotation found in Review class.");
	            }

	        } catch (ClassNotFoundException e) {
	            // If the class is not found, fail the test
	            fail("Class not found: " + e.getMessage());
	        }
	    }
	 
    @Test
    public void backend_testOrderHasManyToOneAnnotation() {
        try {
            // Use reflection to get the Class object for the Course class
            Class<?> courseClass = Class.forName("com.examly.springapp.model.Order");

            // Get all declared fields in the Course class
            Field[] declaredFields = courseClass.getDeclaredFields();

            // Check each field for the @OneToMany annotation
            boolean hasManyToOne = false;
            for (Field field : declaredFields) {
                if (field.isAnnotationPresent(ManyToOne.class)) {
                    hasManyToOne = true;
                    break; // Stop checking once we find one field with @OneToMany
                }
            }
	
	
            // If no field with @OneToMany is found, fail the test
            if (!hasManyToOne) {
                fail("No field with @ManyToOne annotation found in Order class.");
            }

        } catch (ClassNotFoundException e) {
            // If the class is not found, fail the test
            fail("Class not found: " + e.getMessage());
        }
    }

    @Test
    public void backend_testProductInterfaceAndImplementation() {
        try {
            Class<?> interfaceClass = Class.forName("com.examly.springapp.service.ProductService");
            Class<?> implementationClass = Class.forName("com.examly.springapp.service.ProductServiceImpl");

            assertTrue(interfaceClass.isInterface(), "The specified class is not an interface");
            assertTrue(interfaceClass.isAssignableFrom(implementationClass), "Implementation does not implement the interface");
        } catch (ClassNotFoundException e) {
            fail("Interface or implementation not found");
        }
    }

    @Test
    public void backend_testOrderInterfaceAndImplementation() {
        try {
            Class<?> interfaceClass = Class.forName("com.examly.springapp.service.OrderService");
            Class<?> implementationClass = Class.forName("com.examly.springapp.service.OrderServiceImpl");

            assertTrue(interfaceClass.isInterface(), "The specified class is not an interface");
            assertTrue(interfaceClass.isAssignableFrom(implementationClass), "Implementation does not implement the interface");
        } catch (ClassNotFoundException e) {
            fail("Interface or implementation not found");
        }
    }

    
    

    private void checkClassExists(String className) {
        try {
            Class.forName(className);
        } catch (ClassNotFoundException e) {
            fail("Class " + className + " does not exist.");
        }
    }

	 @Test
     public void backend_testReviewControllerClassExists() {
       checkClassExists("com.examly.springapp.controller.ReviewController");
     }
	 
	 @Test
	   public void backend_testProductControllerClassExists() {
	       checkClassExists("com.examly.springapp.controller.ProductController");
	   }

	   @Test
	   public void backend_testOrderControllerClassExists() {
	       checkClassExists("com.examly.springapp.controller.OrderController");
	   }

	   @Test
	   public void backend_testAuthControllerClassExists() {
	       checkClassExists("com.examly.springapp.controller.AuthController");
	   }

	 
	 @Test
	   public void backend_testReviewModelClassExists() {
	       checkClassExists("com.examly.springapp.model.Review");
	   }
	 
	 @Test
	   public void backend_testOrderModelClassExists() {
	       checkClassExists("com.examly.springapp.model.Order");
	   }
	 
	 @Test
	   public void backend_testUserModelClassExists() {
	       checkClassExists("com.examly.springapp.model.User");
	   }
	 
	 @Test
	   public void backend_testProductModelClassExists() {
	       checkClassExists("com.examly.springapp.model.Product");
	   }

	   @Test
	   public void backend_testOrderItemModelClassExists() {
	       checkClassExists("com.examly.springapp.model.OrderItem");
	   }

}
