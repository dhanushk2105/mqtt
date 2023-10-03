import { Request, Response } from "express"
import db from '../db/db'

export const getAllListing = (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // Default to 10 items per page
    const offset = (page - 1) * itemsPerPage;
  
    const sql = 'SELECT * FROM mqtt_log LIMIT ? OFFSET ?';
  
    db.all(sql, [itemsPerPage, offset], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Optionally, you can also query the total number of listings
      db.get('SELECT COUNT(*) as total FROM mqtt_log', (err, result : any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const totalListings = result.total;
  
        const totalPages = Math.ceil(totalListings / itemsPerPage);
  
        res.json({
          data: rows,
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: itemsPerPage,
          totalListings: totalListings,
        });
      });
    });
  };

  export const getListing = (req: Request, res: Response) => {
    const { id } = req.params
    const page = parseInt(req.query.page as string) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // Default to 10 items per page
    const offset = (page - 1) * itemsPerPage;
  
    const sql = 'SELECT * FROM mqtt_log WHERE client_id = ? LIMIT ? OFFSET ?';
  
    db.all(sql, [id, itemsPerPage, offset], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Optionally, you can also query the total number of listings
      db.get('SELECT COUNT(*) as total FROM mqtt_log WHERE client_id = ?',[id] , (err, result : any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const totalListings = result.total;
  
        const totalPages = Math.ceil(totalListings / itemsPerPage);
  
        res.json({
          data: rows,
          currentPage: page,
          totalPages: totalPages,
          itemsPerPage: itemsPerPage,
          totalListings: totalListings,
        });
      });
    });
  };

  export const getDetail = (req: Request, res: Response) => {
    const { id } = req.params
    const page = parseInt(req.query.page as string) || 1;
    const itemsPerPage = parseInt(req.query.itemsPerPage as string) || 10; // Default to 10 items per page
    const offset = (page - 1) * itemsPerPage;
  
    const sql = 'SELECT * FROM mqtt_log WHERE id = ? LIMIT ? OFFSET ?';
  
    db.all(sql, [id, itemsPerPage, offset], (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
  
      // Optionally, you can also query the total number of listings
      db.get('SELECT COUNT(*) as total FROM mqtt_log WHERE client_id = ?',[id] , (err, result : any) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const totalListings = result.total;
  
        const totalPages = Math.ceil(totalListings / itemsPerPage);
  
        res.json({
          data: rows,
        });
      });
    });
  };
