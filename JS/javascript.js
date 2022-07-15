var moves=0;
        var rows=4; 
        var columns=4;
        var A;
        var z=1;
        var y=0;
        var Time;
        var timer;
        var p;
        var q;
        var temp;
        var g=0;
        startNewGame();
        document.getElementById("NewGame").addEventListener( "click", startNewGame, false );
        document.getElementById("Original").addEventListener("click",function(){z=1;startNewGame();});
        document.getElementById("Rook1").addEventListener("click",function(){z=2;startNewGame();});
        document.getElementById("Rook2").addEventListener("click",function(){z=3;startNewGame();});
        document.getElementById("Bishop").addEventListener("click",function(){z=4;startNewGame();});
        document.getElementById("Queen").addEventListener("click",function(){z=5;startNewGame();});
        document.getElementById("Freeze").addEventListener("click",function(){z=6;startNewGame();});
        
        function startNewGame()
        {   y=0;
            g=0;
            clearInterval(timer);
            document.getElementById("Time").innerHTML=0;
            var a;
            moves = 0;
            rows = document.getElementById("rows").value;
            columns = document.getElementById("columns").value;
            
            var B = new Array(rows*columns);
            A = new Array(rows);
            for (var i = 0; i < rows; i++)
            {
                A[i] = new Array(columns);
            }
            for(var i=0;i<rows*columns;i++)
            {
                a=Math.floor(Math.random()*rows*columns);
                if(B.indexOf(a)==-1)
                {
                    B[i]=a;
                }
                else
                {
                    i--;
                }
            }
            for(var i = 0; i < rows; i++)
            {
                for (var j = 0; j < columns; j++)
                {
                A[i][j] = B[i*columns+j];
                }
            }
            if(z==6)
            {   var f=0;
                while(f==0)
                {
                    p=Math.floor(Math.random()*rows);
                    q=Math.floor(Math.random()*columns);
                    if(A[p][q]!=0)
                    {
                        f=1;
                    }
                }
                temp=A[p][q];
                A[p][q]="["+A[p][q]+"]";
            }
            Update();
        }

        function Update()
        {
            var TABLE="";
            for (var i=0;i<rows;i++)
            {
                TABLE+="<tr>";
                for (var j=0;j<columns;j++)
                {
                    if (A[i][j]==0)
                    { 
                        TABLE+="<td> </td>";
                    }
                    else
                    {
                        TABLE+="<td onclick=\"Check("+i+","+j+")\">"+A[i][j]+"</td>";
                    }
                }
                TABLE+="</tr>";
            }
            document.getElementById("moves").innerHTML=moves;
            document.getElementById("table").innerHTML=TABLE;

        }

        
        function Check(row,column)
        {
            
            if(y==0)
            {
                var Time1=Date.now();
                timer=setInterval(function() 
                {
                    var Time2 = Date.now();
                    Time = Time2-Time1;
                    var days = Math.floor(Time / (1000 * 60 * 60 * 24));
                    var hours = Math.floor((Time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    var minutes = Math.floor((Time % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((Time % (1000 * 60)) / 1000);
                    document.getElementById("Time").innerHTML =days+":"+hours+":"+minutes+":"+seconds;
                    
                    if(z==6&&Time>30000&&g==0)
                    {
                        A[p][q]=temp;
                        Update();
                        g=1;
                    }
                }, 1000);
                y=1;
            }
            for(var i=0;i<rows;i++)
            {
                if(A[i].indexOf(0)!=-1)
                {
                    r=i;
                    c=A[i].indexOf(0);
                }
            }
            if(z==1)
            {
                rd=row-r;
                cd=column-c;
                if(((rd==1||rd==-1)&&(cd==0))||((cd==1||cd==-1)&&(rd==0)))
                {
                    Move(row,column,r,c);
                }
            }
            if(z==2)
            {
                if(row==r||column==c)
                {
                    Move(row,column,r,c);
                }
            }
            if(z==3)
            {
                if(row==r)
                {
                    if(c>column)
                    {
                        for(var i=c;i>column;i--)
                        {
                            Move(r,i-1,r,i);
                        }
                    }
                    if(c<column)
                    {
                        for(var i=c;i<column;i++)
                        {
                            Move(r,i+1,r,i);
                        }
                    }
                }
                if(column==c)
                {
                    if(r>row)
                    {
                        for(var i=r;i>row;i--)
                        {
                            Move(i-1,c,i,c);
                        }
                    }
                    if(r<row)
                    {
                        for(var i=r;i<row;i++)
                        {
                            Move(i+1,c,i,c);
                        }
                    }
                }
            }
            if(z==4)
            {
                rd=Math.abs(r-row);
                cd=Math.abs(c-column);
                if(rd==cd)
                {
                    Move(row,column,r,c);
                }
            }
            if(z==5)
            {
                rd=Math.abs(r-row);
                cd=Math.abs(c-column);
                if(rd==cd||row==r||column==c)
                {
                    Move(row,column,r,c);
                }
            }
            if(z==6)
            {
                if(((row!=p||column!=q)&&(Time<=30000&&Time>=0))||(Time>30000))
                {
                    rd=row-r;
                    cd=column-c;
                    if(((rd==1||rd==-1)&&(cd==0))||((cd==1||cd==-1)&&(rd==0)))
                    {
                        Move(row,column,r,c);
                    }
                }
            }
        }    
            
        function Move(row,column,r,c)
        {   
            A[r][c]=A[row][column];
            A[row][column]=0;
            moves++; 
            Update();
            if(row==(rows-1)&&column==(columns-1))
            {
                Victory();
            }
        }

        function Victory()
        {
            var k;
            var flag=0;
            for (var i = 0; i < rows; i++)
            {
                for (var j = 0; j < columns; j++)
                {
                    k=i*columns+j+1;
                    if (A[i][j] != k)
                    {
                        if(k!=16)
                        {
                            flag=1;
                        }
                    }
                    
                }
            }
            if(flag==0)
            {
                alert("Victory!! It took you "+moves+" moves!");
                clearInterval(timer);
            } 
        }