import { 
  getAll, 
  getOne, 
  createOne, 
  updateOne, 
  deleteOne 
} from '../services/productService.js';

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await getAll();
    res.status(200).json({
      succes: true,
      status: 200,
      message: "All products",
      data: allProducts
    });   
  } catch (error) {
    res.status(500).send({
      succes: false,
      status: 400,
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
        succes: false,
        status: 404,
        message: "Product not found",
      });
    };

    res.status(200).json({
      succes: true,
      status: 200,
      message: "Product found",
      data: product
    });   
  } catch (error) {
    res.status(500).send({
      succes: false,
      status: 500,
      message: "Error getting product",
    });   
  }
};

export const createOneProduct = async (req, res) => {
  try {
    const dataProduct = req.body;
    const createdProduct = await createOne( dataProduct );
    res.status(201).json({
      succes: true,
      status: 201,
      message: "Created product",
      data: createdProduct
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      status: 500,
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
        succes: false,
        status: 404,
        message: "Product not found",
      });
    };
    
    const updatedProduct = await updateOne( id, dataProduct );
    res.status(200).json({
      succes: true,
      status: 200,
      message: "Product updated",
      data: updatedProduct
    });
  } catch (error) {
    res.status(500).send({
      succes: false,
      status: 500,
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
        succes: false,
        status: 404,
        message: "Product not found",
      });
    };

    const deletedProduct = await deleteOne(id);
    res.status(202).json({
      succes: true,
      status: 202,
      message: "Product deleted",
    });    
  } catch (error) {
    res.status(500).send({
      succes: false,
      status: 500,
      message: "Error deleting product",
    });    
  }
};
