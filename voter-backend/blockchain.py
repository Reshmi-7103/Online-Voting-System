import hashlib
import datetime


class Block:
    def __init__(self, voter, candidate, previous_hash):
        self.voter = voter
        self.candidate = candidate
        self.timestamp = str(datetime.datetime.now())
        self.previous_hash = previous_hash
        self.hash = self.generate_hash()

    def generate_hash(self):
        data = self.voter + self.candidate + self.timestamp + self.previous_hash
        return hashlib.sha256(data.encode()).hexdigest()


class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]

    # 🔥 First block
    def create_genesis_block(self):
        return Block("Genesis", "None", "0")

    # 🔥 Last block
    def get_last_block(self):
        return self.chain[-1]

    # 🔥 Add new vote as block
    def add_vote(self, voter, candidate):
        previous_hash = self.get_last_block().hash
        new_block = Block(voter, candidate, previous_hash)
        self.chain.append(new_block)

    # 🔥 Get full blockchain
    def get_chain(self):
        chain_data = []

        for block in self.chain:
            chain_data.append({
                "voter": block.voter,
                "candidate": block.candidate,
                "timestamp": block.timestamp,
                "previous_hash": block.previous_hash,
                "hash": block.hash
            })

        return chain_data


