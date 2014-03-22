---
layout: post
title: Connected Nodes Processing
date: '2011-09-06T17:37:00+02:00'
tags:
- processing
- code
tumblr_url: http://fabiantheblind.tumblr.com/post/9878896421/connected-nodes-processing
---

    // see the video here--> http://vimeo.com/28665864
    NodeSystem ns; // the System    
      int num = 100; // number of nodes 
    void setup(){   
      background(255,5);  // bg for startup 
      size(400,250);    
      // the starting distance for the calculation of the lines 
      int distance = 42;    
      // create the NodeSystem with distance    
       ns = new NodeSystem(distance);   
    // frameRate(1);    
       smooth(); // make it smooth  
        // initalise all the nodes  
        // if you put the init into the draw it calcs every loop new nodes  
       ns.init(num);    
    }// end of setup    
    //  
    void draw(){    
      // write a rect in the size of the sketch for smooth background clear 
      noStroke();   
      fill(255,23); 
      rect(0,0,width,height);   
    // run the node system  
      ns.run(); 
    //saveFrame("images/nodes-####.tif");   
    //  noLoop();   
    }   
    // thew node class holdes the only the points   
    // the lines get caculated in the NodeSystem    
    class Node{ 
      PVector pos; // the node position 
      PVector vel; // the velocity of the node  
      float diam; // the diameter   
      int cons = 0; // the connection he has    
      // the constructor    
      Node(PVector pos,float diam){ 
      this.pos = pos;   
      this.diam = diam; 
      // start with own velocity    
      vel = new PVector(random(-2,2),random(-2,2)); 
      } 
    // draw the node    
      void show(){  
      fill(255);    
      ellipse(pos.x, pos.y, diam, diam);    
      } 
      // update the posiotn 
        void update() { 
        // Motion 101: Locations changes by velocity.   
        pos.add(vel);   
      } 
      // check Edges makes them come in from the other side 
    void checkEdges() { 
        if (pos.x > width) {    
          pos.x = 0;    
        } else if (pos.x < 0) { 
          pos.x = width;    
        } // X  
        if (pos.y > height) {   
          pos.y = 0;    
        } else if (pos.y < 0) { 
          pos.y = height;   
        }// Y   
      }// end checkEdges    
    }   
    class NodeSystem{   
      ArrayList  nodes; // a list of nodes    
      float distance; // inintal distance   
      // constructor    
      NodeSystem(float dis){    
      this.distance = dis;  
      } 
      // this initalizes the nodes  
      void init(int num){   
        nodes = new ArrayList();    
        // loop thru num    
        for(int i = 0; i < num; i++){   
          // make a random point    
          float x = random(10, width - 10); 
          float y = random(10, height - 10);    
          float diam = 1;// with diameter   
          PVector pos = new PVector(x,y);// position into PVector   
        Node n = new Node(pos,diam);    
        nodes.add(n); // add the new node to the list   
        }   
      } 
      // run the nodesystem 
      void run(){   
        display();  
      } 
    // calculate the connections and draw the lines 
    void calcConnections(Node n){   
      int num = 0; // number of connections 
      for(int i = 0; i < nodes.size(); i ++){   
          PVector  v1 = n.pos; // position of the refrence positoin 
          PVector  v2 = nodes.get(i).pos; // every other node   
          float d =  PVector.dist(v1, v2);// calc the distance  
          // now if the node already has some connections   
          // make the diastance he can check higher 
          if((d < distance + n.cons* 3) &&(d > 1)){ 
            stroke(0,100);  
            line(v1.x , v1.y,v2.x, v2.y); // draw the line  
                    num++; // increment num 
          } 
        // set the connections of the node to the num   
      n.cons = num; 
      } 
      } 
      // display the nodes and draw the connections 
    void display(){ 
           Node n = null;// keep it clear   
      for(int i = 0; i < nodes.size(); i++){    
        n = nodes.get(i);   
        // call the functions of node   
        n.checkEdges();     
        calcConnections(n); 
        n.diam = n.cons/3; // set the size  
        n.show();// display 
        n.update(); // and update position  
        }   
      } // end display  
    }
