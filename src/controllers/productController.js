import { 
  getAll, 
  getOne, 
  createOne, 
  updateOne, 
  deleteOne 
} from '../services/productService.js';
import { validateProduct } from '../utils/schemas/product.js';

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await getAll();
    if(!allProducts) return res.status(404).json({
      status: false,
      statusCode: 404,
      message: "Products not found",
    });

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "All products",
      data: allProducts
    });   
  } catch (error) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Error getting all products",
    });
  };
};

 export const getOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getOne( id );

    if(!product) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Product not found",
      });
    };

    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Product found",
      data: product
    });   
  } catch (error) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Error getting product",
    });   
  }
};

export const createOneProduct = async (req, res) => {
  try {
    const dataProduct = req.body;

    //Validate data with schema
    const dataProductValidation = validateProduct( dataProduct );
    if(dataProductValidation.error) return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Invalid data",
      error: JSON.parse(dataProductValidation.error.message)
    });

    const createdProduct = await createOne( dataProduct );

    if(!createdProduct) return res.status(500).json({
      status: false,
      statusCode: 500,
      message: "Error creating product"
    });
    
    res.status(201).json({
      status: true,
      statusCode: 201,
      message: "Created product",
      data: createdProduct
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Error creating product",
    });
  }
};

export const updateOneProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const dataProduct = req.body;
    const product = await getOne( id );

    if(!product) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Product not found",
      });
    };

    const dataProductValidation = validateProduct( dataProduct );
    if(dataProductValidation.error) return res.status(400).json({
      status: false,
      statusCode: 400,
      message: "Invalid data",
      error: JSON.parse(dataProductValidation.error.message)
    });
    
    const updatedProduct = await updateOne( id, dataProduct );
    res.status(200).json({
      status: true,
      statusCode: 200,
      message: "Product updated",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Error updating product",
    });    
  }
};

export const deleteOneProduct = async (req, res) => {  
  try {
    const { id } = req.params;
    const product = await getOne( id );

    if(!product) {
      return res.status(404).json({
        status: false,
        statusCode: 404,
        message: "Product not found",
      });
    };

    const deletedProduct = await deleteOne(id);
    res.status(202).json({
      status: true,
      statusCode: 202,
      message: "Product deleted",
    });    
  } catch (error) {
    res.status(500).send({
      status: false,
      statusCode: 500,
      message: "Error deleting product",
    });    
  }
};
