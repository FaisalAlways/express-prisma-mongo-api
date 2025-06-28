import prisma from "../DB/db.config";
import { Request, Response } from "express";

//CREATED
export const store = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const movie = await prisma.movie.create({ data: { name } });

    return res
      .status(201)
      .json({ status: 200, movie, message: "Movie added successfully!" });
  } catch (error) {
    console.error("Error adding movie:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
};

//FETCH
export const index = async (req: Request, res: Response) => {
  const movies = await prisma.movie.findMany({
    include: {
      Cast: {
        select: {
          name: true,
          description: true,
        },
      },
    },
  });
  return res.json({ status: 200, movies });
};

//UPDATE

export const update = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;
  await prisma.movie.update({
    data: {
      name,
    },
    where: {
      id: id,
    },
  });

  return res.json({ status: 200, message: "Movie updated successfylly!" });
};

// DELETE
export const destroy = async (req: Request, res: Response) => {
  const { id } = req.params;
  await prisma.movie.delete({
    where: {
      id,
    },
  });
  return res.json({ status: 200, message: "Movie Deleted successfylly!" });
};
