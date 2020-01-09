var speed=4;
var car=$('.car');
var car_1=$('#car_1');
var car_2=$('#car_2');
var car_3=$('#car_3');
var car_4=$('#car_4');
var car_5=$('#car_5');
var car_6=$('#car_6');
var container=$('#container');
var container_width;
var container_height=parseInt(container.height());
var car_width=parseInt(car.width());
var anim_id;
var car_left;
var containerAmount;
var randomTracker = [];
function repeat()
{ 
    car_down(car_1);
    car_down(car_2);
    car_down(car_3);
    car_down(car_4);
    car_down(car_5);
    car_down(car_6);
    anim_id=requestAnimationFrame(repeat);
}
//for random
function existingNum() {
  for (var i = 0; i < randomTracker.length; i++) {
    if (randomTracker[i] === car_left) {
      return true;
    }
    else
    {       debugger;
            
                var res=Math.abs(randomTracker[i]-car_left);
                if(res<(car_width+10))
                {
                  return true;
                }
             
    }
  }
  return false;
}
//
function car_down(car)
{
    var current_top=parseInt(car.css('top'));
    if(current_top>container_height)
    {
        current_top=-200;
        debugger;
        //for random
            do {
              car_left=parseInt(Math.random()*(container_width-(car_width+10)));
            } while (existingNum());
            if(randomTracker.length<containerAmount)
            {
              randomTracker.push(car_left);
            }
            else{
              randomTracker=[];
              randomTracker.push(car_left);
            }
            
            car.css('left',car_left);
            //
        
       
    }
    car.css('top',current_top+speed);
}
///////////////////////////////////////////////////////
Splitting();
let currentPlayer = 1;
let players = [];
let audio = new Audio('air.mp3');
const Player = function(name,color)
{
    this.Playername = name;
    this.favColor = color;
}
$(document).on('keydown',function(e)
{
    if(e.keyCode === 40)
    {
        $(".fa-arrow-right").css('top',56+"%");
        currentPlayer = $("#btn-2").data("player");
        $("#btn-2").css('box-shadow','0 0 15px gainsboro');
        $("#btn-1").css('box-shadow','0 0 15px transparent');
    }
    else if(e.keyCode === 38)
    {
        $(".fa-arrow-right").css('top',6+"%");
        currentPlayer = $("#btn-1").data("player");
        $("#btn-1").css('box-shadow','0 0 15px gainsboro');
        $("#btn-2").css('box-shadow','0 0 15px transparent');
    }
    else if(e.keyCode === 13)
    {
        $(".main-sec").css('display','none');
        if(currentPlayer === 1)
        {
          $(".players-sec").css('display','block');
          $(".verLine").css('display','none');
          $(".pl-2").css('display','none');
          $(".pl").css('justify-content','center');
        }
        else if(currentPlayer === 2)
        {
            $(".players-sec").css('display','block');
        }

    }
});
$('#btn-start').on('click',function()
{
    let count = 0;
    for(let i = 0; i < currentPlayer;i++)
    {
        if($('#player-'+Number(i+1))[0].value ==="")
        {
            $('#p-'+Number(i+1)).text('Please fill out this area');
        }
        else
        {
            $('#p-'+Number(i+1)).text('');
            players[i] = new Player($('#player-'+Number(i+1))[0].value,$('#play-'+Number(i+1))[0].value);
            count+=1;
        }
    }
    if(count === currentPlayer)
    {
        $(".players-sec").css('display','none');
        $("#raceSec").css('display','block');
        let distance = 11;
        let x = setInterval(function()
       {
         distance -= 1;
         $('#count').text(distance);
         if (distance < 0)
            {
            $('#count').text('');
            audio.play();
            clearInterval(x);
            clearInterval(x);
            //
            anim_id=requestAnimationFrame(repeat);
            //
            }
        },1000);
        if(count > 1)
        {
            $("#container").css('width',50+"%");
            $('#car-2').css('display','block');
                      //
                      container_width=parseInt(container.css('width'));
                      car_4.css('display','block');
                      car_5.css('display','block');
                      car_6.css('display','block');
                      containerAmount=6;
                      //
            $('#lines').css('display','block');
            $('#plData-2').css('display','block');
            $('.R1').addClass('road');
            for(let i = 0; i < count; i++)
            {
                $('#car-'+Number(i+1)).css('background-color',players[i].favColor);
                $('#plData-'+Number(i+1)).find('p').text(players[i].Playername);
            }
        }
        else
        {
            $('#car-1').css('background-color',players[0].favColor);
            $('#plData-1').find('p').text(players[0].Playername);
            $("#container").css('left',40+"%");
                     //
                     containerAmount=3;
                     container_width=parseInt(container.css('width'));
                     //
        }

    }
});
