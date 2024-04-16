class Start extends Scene {
    create() {
        
        this.engine.setTitle(this.engine.storyData.Title);
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }
}

class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body); 
        
        if(locationData.Choices) {
            for(let choice of locationData.Choices) { 
                this.engine.addChoice(choice.Text, choice); 
            }
        } else {
            this.engine.addChoice("The end.")
        }


        
    }

    handleChoice(choice) {
        if(choice && !choice.special) {
            console.log("normal choice");

            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }else if(choice.special){
            console.log("special choice");
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(SpecLocation, choice.Target);
        }else{
            this.engine.gotoScene(End);
        }
        
    }

    

    
}

class SpecLocation extends Location{
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; 
        this.engine.show(locationData.Body); 
        
        if(locationData.Choices) {
            for(let choice of locationData.Choices) { 
                this.engine.addChoice(choice.Text, choice); 
            }
        } else {
            this.engine.addChoice("The end.")
        }


        if(locationData.KeyLocation){
            for(let choice of locationData.KeyLocation) { 
                if(!choice.visited){
                    this.engine.storyData.Locations[choice.Append].Choices.push(choice.AppendVal);
                    this.engine.storyData.Locations[choice.Append].Body = choice.AppendVal.NewBody;

                    this.engine.storyData.Locations[choice.PopVal.start].Choices.pop();
                    this.engine.storyData.Locations[choice.Append].Body = choice.AppendVal.NewBody;
                    choice.visited = true;
                }
                // TODO: add a useful second argument to addChoice so that the current code of handleChoice below works
            }
        }
    }


    handleChoice(choice){
        console.log("this is a special scene")
        if(choice && !choice.special) {
            console.log("normal choice");

            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        }else if(choice.special){
            console.log("special choice");
            this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(SpecLocation, choice.Target);
        }else{
            this.engine.gotoScene(End);
        }
    }
}



class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');