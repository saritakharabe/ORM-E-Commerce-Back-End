const router = require('express').Router();
const { Category, Product, } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll(
      {
        include: [{model: Product}]
      },
    );
    res.status(200).json(categoryData)
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryID = await Category.findByPk({
      where: {
        category_id: req.params.category_id
      },
      includes: [{model: Product}]
    });

    if (!categoryID) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryID);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }   
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update({
      category_name : req.params.category_name
    },
    {
      where: {
        category_id : req.params.category_id,
      }
    })
    if(!updateCategory){
      res.status(404).json({message: 'Catergory with this id is not found'})
    }
    res.status(200).json(updateCategory)
  } catch (error) {
    res.status(400).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        category_id: req.params.category_id
      }
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
