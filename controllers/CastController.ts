import prisma from "../DB/db.config";
import { Request, Response } from "express";

// CREATE Cast
export const store = async (req: Request, res: Response) => {
  try {
    const { name, description, movie_id } = req.body;

    if (!name || !description || !movie_id) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const cast = await prisma.cast.create({
      data: {
        name,
        description,
        movieId: movie_id,
      },
    });

    return res
      .status(201)
      .json({ status: 201, cast, message: "✅ Cast added successfully!" });
  } catch (error) {
    console.error("Error adding cast:", error);
    return res.status(500).json({ message: "❌ Something went wrong" });
  }
};

// GET All Casts
export const index = async (req: Request, res: Response) => {
  try {
    const casts = await prisma.cast.findMany({
      include:{
        movie:true
      }
    });
    return res.status(200).json({ status: 200, casts });
  } catch (error) {
    console.error("Error fetching casts:", error);
    return res.status(500).json({ message: "❌ Failed to fetch casts" });
  }
};

// UPDATE Cast
export const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, movie_id } = req.body;

    const updatedCast = await prisma.cast.update({
      data: {
        name,
        description,
        movieId: movie_id,
      },
      where: {
        id,
      },
    });

    return res
      .status(200)
      .json({ status: 200, cast: updatedCast, message: "✅ Cast updated successfully!" });
  } catch (error) {
    console.error("Error updating cast:", error);
    return res.status(500).json({ message: "❌ Update failed" });
  }
};

// DELETE Cast
export const destroy = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await prisma.cast.delete({
      where: {
        id,
      },
    });

    return res.status(200).json({ status: 200, message: "✅ Cast deleted successfully!" });
  } catch (error) {
    console.error("Error deleting cast:", error);
    return res.status(500).json({ message: "❌ Delete failed" });
  }
};
