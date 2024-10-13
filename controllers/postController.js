const Post = require('../models/Post');

const createPost = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Por favor, forneça título e conteúdo' });
    }

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: 'Usuário não autenticado' });
    }

    const newPost = await Post.create({
      title,
      content,
      user: req.user.id
    });

    res.status(201).json(newPost);
  } catch (error) {
    console.error('Erro ao criar post:', error);
    res.status(500).json({ message: 'Erro ao criar post' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name');
    res.status(200).json(posts);
  } catch (error) {
    console.error('Erro ao buscar posts:', error);
    res.status(500).json({ message: 'Erro ao buscar posts' });
  }
};

const updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    if (post.user && post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    post.title = req.body.title || post.title;
    post.content = req.body.content || post.content;

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error('Erro ao atualizar post:', error);
    res.status(500).json({ message: 'Erro ao atualizar post' });
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post não encontrado' });
    }

    // Verifica se o post não tem usuário ou se o usuário atual é o criador do post
    if (post.user && post.user.toString() !== req.user.id) {
      return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post removido com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar post:', error);
    res.status(500).json({ message: 'Erro ao deletar post' });
  }
};

module.exports = { createPost, getPosts, updatePost, deletePost };
