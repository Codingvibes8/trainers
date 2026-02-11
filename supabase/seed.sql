-- Seed data for NexShop Pro
-- Run this after schema.sql

-- Insert categories
INSERT INTO categories (id, name, slug, image_url) VALUES
  ('c1000000-0000-0000-0000-000000000001', 'Running', 'running', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'),
  ('c1000000-0000-0000-0000-000000000002', 'Training', 'training', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400'),
  ('c1000000-0000-0000-0000-000000000003', 'Basketball', 'basketball', 'https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=400'),
  ('c1000000-0000-0000-0000-000000000004', 'Lifestyle', 'lifestyle', 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=400');

-- Insert products
INSERT INTO products (id, name, slug, description, price, compare_at_price, category_id, images, is_available, is_featured, rating, review_count) VALUES
  -- Running shoes
  ('b1000000-0000-0000-0000-000000000001', 
   'Nike Air Zoom Pegasus 41', 
   'nike-air-zoom-pegasus-41',
   'The Nike Air Zoom Pegasus 41 continues to put a spring in your step with responsive cushioning and durable support. Built for running, training, and everything in between.',
   124.99, 149.99,
   'c1000000-0000-0000-0000-000000000001',
   ARRAY['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
   true, true, 4.8, 324),

  ('b1000000-0000-0000-0000-000000000002',
   'Adidas Ultraboost Light',
   'adidas-ultraboost-light',
   'Experience incredible energy return with the lightest Ultraboost ever. BOOST midsole delivers unmatched cushioning for runners who demand more.',
   179.99, NULL,
   'c1000000-0000-0000-0000-000000000001',
   ARRAY['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800', 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
   true, true, 4.7, 256),

  ('b1000000-0000-0000-0000-000000000003',
   'New Balance Fresh Foam X 1080v13',
   'new-balance-fresh-foam-1080v13',
   'Premium underfoot comfort meets road-ready performance. Fresh Foam X midsole provides a plush, responsive ride mile after mile.',
   159.99, 184.99,
   'c1000000-0000-0000-0000-000000000001',
   ARRAY['https://images.unsplash.com/photo-1539185441755-769473a23570?w=800'],
   true, true, 4.9, 189),

  ('b1000000-0000-0000-0000-000000000004',
   'ASICS Gel-Kayano 30',
   'asics-gel-kayano-30',
   'Legendary stability runner with FF BLAST PLUS cushioning. Perfect for overpronators seeking maximum support without sacrificing comfort.',
   189.99, NULL,
   'c1000000-0000-0000-0000-000000000001',
   ARRAY['https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=800'],
   true, false, 4.6, 142),

  -- Training shoes
  ('b1000000-0000-0000-0000-000000000005',
   'Nike Metcon 9',
   'nike-metcon-9',
   'Built for the toughest workouts. Flat, stable heel for lifting. Flexible forefoot for sprints. The ultimate cross-training shoe.',
   149.99, NULL,
   'c1000000-0000-0000-0000-000000000002',
   ARRAY['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800'],
   true, true, 4.7, 198),

  ('b1000000-0000-0000-0000-000000000006',
   'Under Armour Project Rock 6',
   'ua-project-rock-6',
   'Train like The Rock. Superior stability, responsive cushioning, and premium durability for athletes who push their limits.',
   159.99, 179.99,
   'c1000000-0000-0000-0000-000000000002',
   ARRAY['https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=800'],
   true, false, 4.5, 167),

  ('b1000000-0000-0000-0000-000000000007',
   'Reebok Nano X4',
   'reebok-nano-x4',
   'The go-to CrossFit trainer. Flexweave woven upper for breathability. Floatride Energy Foam for cushioning during high-impact workouts.',
   139.99, NULL,
   'c1000000-0000-0000-0000-000000000002',
   ARRAY['https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800'],
   true, false, 4.4, 98),

  -- Basketball shoes
  ('b1000000-0000-0000-0000-000000000008',
   'Nike LeBron 21',
   'nike-lebron-21',
   'King James official signature shoe. Zoom Air units for explosive responsiveness. Designed for dominant performance on the court.',
   199.99, 229.99,
   'c1000000-0000-0000-0000-000000000003',
   ARRAY['https://images.unsplash.com/photo-1579338559194-a162d19bf842?w=800'],
   true, true, 4.8, 234),

  ('b1000000-0000-0000-0000-000000000009',
   'Jordan 1 Retro High OG',
   'jordan-1-retro-high-og',
   'The shoe that started it all. Premium leather construction. Iconic style that transcends basketball.',
   179.99, NULL,
   'c1000000-0000-0000-0000-000000000003',
   ARRAY['https://images.unsplash.com/photo-1552346154-21d32810aba3?w=800'],
   true, true, 4.9, 567),

  ('b1000000-0000-0000-0000-000000000010',
   'Adidas Harden Vol. 8',
   'adidas-harden-vol-8',
   'Designed for shifty guards. Low-to-the-ground feel with BOOST cushioning for explosive first steps.',
   159.99, 189.99,
   'c1000000-0000-0000-0000-000000000003',
   ARRAY['https://images.unsplash.com/photo-1584735175097-719d848f8449?w=800'],
   true, false, 4.3, 89),

  -- Lifestyle shoes
  ('b1000000-0000-0000-0000-000000000011',
   'Nike Air Force 1 ''07',
   'nike-air-force-1-07',
   'The radiance lives on. The classic sneaker that puts a fresh spin on what you know best: durably stitched overlays, clean finishes and Air comfort.',
   109.99, NULL,
   'c1000000-0000-0000-0000-000000000004',
   ARRAY['https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=800'],
   true, true, 4.8, 1243),

  ('b1000000-0000-0000-0000-000000000012',
   'Puma RS-X Reinvention',
   'puma-rs-x-reinvention',
   'Bold. Chunky. Unmistakably PUMA. The RS-X brings running heritage into the future with exaggerated proportions.',
   119.99, 139.99,
   'c1000000-0000-0000-0000-000000000004',
   ARRAY['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800'],
   true, false, 4.4, 156);

-- Insert product variants (sizes and colors)
-- Nike Air Zoom Pegasus 41
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000001', '7', 'Black/White', 15, 'NAPEG41-BW-7'),
  ('b1000000-0000-0000-0000-000000000001', '8', 'Black/White', 20, 'NAPEG41-BW-8'),
  ('b1000000-0000-0000-0000-000000000001', '9', 'Black/White', 25, 'NAPEG41-BW-9'),
  ('b1000000-0000-0000-0000-000000000001', '10', 'Black/White', 30, 'NAPEG41-BW-10'),
  ('b1000000-0000-0000-0000-000000000001', '11', 'Black/White', 18, 'NAPEG41-BW-11'),
  ('b1000000-0000-0000-0000-000000000001', '12', 'Black/White', 12, 'NAPEG41-BW-12'),
  ('b1000000-0000-0000-0000-000000000001', '9', 'Blue/Orange', 20, 'NAPEG41-BO-9'),
  ('b1000000-0000-0000-0000-000000000001', '10', 'Blue/Orange', 22, 'NAPEG41-BO-10'),
  ('b1000000-0000-0000-0000-000000000001', '11', 'Blue/Orange', 15, 'NAPEG41-BO-11');

-- Adidas Ultraboost Light
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000002', '8', 'Core Black', 18, 'AUBLIGHT-CB-8'),
  ('b1000000-0000-0000-0000-000000000002', '9', 'Core Black', 24, 'AUBLIGHT-CB-9'),
  ('b1000000-0000-0000-0000-000000000002', '10', 'Core Black', 30, 'AUBLIGHT-CB-10'),
  ('b1000000-0000-0000-0000-000000000002', '11', 'Core Black', 20, 'AUBLIGHT-CB-11'),
  ('b1000000-0000-0000-0000-000000000002', '9', 'Cloud White', 22, 'AUBLIGHT-CW-9'),
  ('b1000000-0000-0000-0000-000000000002', '10', 'Cloud White', 25, 'AUBLIGHT-CW-10');

-- New Balance Fresh Foam
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000003', '8', 'Grey/Lime', 15, 'NBFF1080-GL-8'),
  ('b1000000-0000-0000-0000-000000000003', '9', 'Grey/Lime', 20, 'NBFF1080-GL-9'),
  ('b1000000-0000-0000-0000-000000000003', '10', 'Grey/Lime', 25, 'NBFF1080-GL-10'),
  ('b1000000-0000-0000-0000-000000000003', '11', 'Grey/Lime', 18, 'NBFF1080-GL-11'),
  ('b1000000-0000-0000-0000-000000000003', '12', 'Grey/Lime', 10, 'NBFF1080-GL-12');

-- ASICS Gel-Kayano 30
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000004', '8', 'Black/Electric Blue', 12, 'AGKAY30-BEB-8'),
  ('b1000000-0000-0000-0000-000000000004', '9', 'Black/Electric Blue', 18, 'AGKAY30-BEB-9'),
  ('b1000000-0000-0000-0000-000000000004', '10', 'Black/Electric Blue', 22, 'AGKAY30-BEB-10'),
  ('b1000000-0000-0000-0000-000000000004', '11', 'Black/Electric Blue', 15, 'AGKAY30-BEB-11');

-- Nike Metcon 9
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000005', '8', 'Black/Volt', 20, 'NMET9-BV-8'),
  ('b1000000-0000-0000-0000-000000000005', '9', 'Black/Volt', 28, 'NMET9-BV-9'),
  ('b1000000-0000-0000-0000-000000000005', '10', 'Black/Volt', 32, 'NMET9-BV-10'),
  ('b1000000-0000-0000-0000-000000000005', '11', 'Black/Volt', 25, 'NMET9-BV-11'),
  ('b1000000-0000-0000-0000-000000000005', '12', 'Black/Volt', 15, 'NMET9-BV-12');

-- UA Project Rock 6
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000006', '9', 'Black/Gold', 15, 'UAPR6-BG-9'),
  ('b1000000-0000-0000-0000-000000000006', '10', 'Black/Gold', 20, 'UAPR6-BG-10'),
  ('b1000000-0000-0000-0000-000000000006', '11', 'Black/Gold', 18, 'UAPR6-BG-11'),
  ('b1000000-0000-0000-0000-000000000006', '12', 'Black/Gold', 10, 'UAPR6-BG-12');

-- Reebok Nano X4
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000007', '8', 'White/Black', 18, 'RNANOX4-WB-8'),
  ('b1000000-0000-0000-0000-000000000007', '9', 'White/Black', 22, 'RNANOX4-WB-9'),
  ('b1000000-0000-0000-0000-000000000007', '10', 'White/Black', 25, 'RNANOX4-WB-10'),
  ('b1000000-0000-0000-0000-000000000007', '11', 'White/Black', 20, 'RNANOX4-WB-11');

-- Nike LeBron 21
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000008', '9', 'Purple/Gold', 12, 'NLB21-PG-9'),
  ('b1000000-0000-0000-0000-000000000008', '10', 'Purple/Gold', 18, 'NLB21-PG-10'),
  ('b1000000-0000-0000-0000-000000000008', '11', 'Purple/Gold', 15, 'NLB21-PG-11'),
  ('b1000000-0000-0000-0000-000000000008', '12', 'Purple/Gold', 10, 'NLB21-PG-12'),
  ('b1000000-0000-0000-0000-000000000008', '13', 'Purple/Gold', 8, 'NLB21-PG-13');

-- Jordan 1 Retro High OG
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000009', '8', 'Chicago', 8, 'J1OG-CHI-8'),
  ('b1000000-0000-0000-0000-000000000009', '9', 'Chicago', 12, 'J1OG-CHI-9'),
  ('b1000000-0000-0000-0000-000000000009', '10', 'Chicago', 15, 'J1OG-CHI-10'),
  ('b1000000-0000-0000-0000-000000000009', '11', 'Chicago', 10, 'J1OG-CHI-11'),
  ('b1000000-0000-0000-0000-000000000009', '9', 'Bred', 10, 'J1OG-BRD-9'),
  ('b1000000-0000-0000-0000-000000000009', '10', 'Bred', 14, 'J1OG-BRD-10'),
  ('b1000000-0000-0000-0000-000000000009', '11', 'Bred', 12, 'J1OG-BRD-11');

-- Adidas Harden Vol 8
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000010', '9', 'Black/Red', 15, 'AHARD8-BR-9'),
  ('b1000000-0000-0000-0000-000000000010', '10', 'Black/Red', 20, 'AHARD8-BR-10'),
  ('b1000000-0000-0000-0000-000000000010', '11', 'Black/Red', 18, 'AHARD8-BR-11'),
  ('b1000000-0000-0000-0000-000000000010', '12', 'Black/Red', 12, 'AHARD8-BR-12');

-- Nike Air Force 1
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000011', '7', 'White', 40, 'NAF1-W-7'),
  ('b1000000-0000-0000-0000-000000000011', '8', 'White', 50, 'NAF1-W-8'),
  ('b1000000-0000-0000-0000-000000000011', '9', 'White', 60, 'NAF1-W-9'),
  ('b1000000-0000-0000-0000-000000000011', '10', 'White', 55, 'NAF1-W-10'),
  ('b1000000-0000-0000-0000-000000000011', '11', 'White', 45, 'NAF1-W-11'),
  ('b1000000-0000-0000-0000-000000000011', '12', 'White', 35, 'NAF1-W-12'),
  ('b1000000-0000-0000-0000-000000000011', '9', 'Black', 40, 'NAF1-B-9'),
  ('b1000000-0000-0000-0000-000000000011', '10', 'Black', 45, 'NAF1-B-10'),
  ('b1000000-0000-0000-0000-000000000011', '11', 'Black', 38, 'NAF1-B-11');

-- Puma RS-X
INSERT INTO product_variants (product_id, size, color, stock, sku) VALUES
  ('b1000000-0000-0000-0000-000000000012', '8', 'White/Blue/Red', 18, 'PRSX-WBR-8'),
  ('b1000000-0000-0000-0000-000000000012', '9', 'White/Blue/Red', 22, 'PRSX-WBR-9'),
  ('b1000000-0000-0000-0000-000000000012', '10', 'White/Blue/Red', 25, 'PRSX-WBR-10'),
  ('b1000000-0000-0000-0000-000000000012', '11', 'White/Blue/Red', 20, 'PRSX-WBR-11');
